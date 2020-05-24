import {Engine,
        World,
        Bodies,
        Body,
        Events,
        Composite,
        Vector,
        } from 'matter-js'


class Bingo {

  constructor(canvas,callback) {
    this.statusCallback = callback
    this.canvas = canvas
    this.init()
    this.started = false
    this.started = true
    this.spinning = true
    this.spinning = false
    this.status = 0
    this.ball = null
    this.trail = []
  }

  init() {

    const engine = Engine.create()
    const world = engine.world
    const width = this.canvas.width
    const height = this.canvas.height
    const radius = this.canvas.width*0.29

    const walls = Composite.create()
    const w = width * 0.1
    Composite.add(walls,Bodies.rectangle(width/2,0-w/2, width, w, {isStatic : true}))
    Composite.add(walls,Bodies.rectangle(width-1+w/2, height/2, w, height, {isStatic : true}))
    Composite.add(walls,Bodies.rectangle(2-w/2, height/2, w, height, {isStatic : true}))
    Composite.add(walls,Bodies.rectangle(width/2, height-1+w/2, width, w, {isStatic : true}))
    Composite.add(walls,Bodies.polygon(width*1, height*0.85, 4, width*0.25, {angle:0.25*Math.PI,isStatic : true}))
    Composite.add(walls,Bodies.polygon(width*0.7, height*1.1, 4, width*0.4, {angle:0.45*Math.PI,isStatic : true}))
    Composite.add(walls,Bodies.polygon(width*0.4, height*1.11, 4, width*0.25, {angle:0.25*Math.PI,isStatic : true}))
    Composite.add(walls,Bodies.polygon(width*0.4, height*1.11, 4, width*0.25, {angle:0.25*Math.PI,isStatic : true}))

    this.pipe = Bodies.polygon(0, height, 3, 50, {angle: Math.PI, isSensor: true,isStatic : true})

    const balls = Composite.create()
    for(let i=0;i<75;i++){
      const a = Math.random()*Math.PI*2
      const r = Math.random()*radius*0.7
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      const b = Bodies.circle(x, y, width*0.02, {
        density:0.1, 
        friction:0, 
        frictionAir:0, 
        restitution:0.92,
        label:`${i+1}`,
      })
      b.number = (i+1)
      Composite.add(balls,b)
    }
    
    const d = width*0.033
    const e = width*0.02
    const cage = Composite.create()
    Composite.add(cage,Bodies.rectangle(0, 0, d/2, d/2, {isStatic : true}))
    Composite.add(cage,Bodies.polygon(d*1.25-radius, 0, 3, d*1.5, {angle:Math.PI,isStatic : true}))
    const sides = 20
    const angle = Math.PI*2/sides
    const side = 2 * Math.sin(angle/2) * radius
    for(let i=0;i<sides;i++){
      const a = angle*i
      const x = Math.cos(a) * radius
      const y = Math.sin(a) * radius

      const b = Bodies.rectangle(x, y, d, side, {
        isStatic : true,
        angle:a, 
        //chamfer: { radius: 2 },
      })
      Composite.add(cage,b)
      if(i===0){
        this.gate1 = b
        this.gate2 = Bodies.rectangle(x+d*2,    y, d/3, d*2, {label:"hiden",isStatic : true,chamfer: { radius: 2 }})
        this.gate3 = Bodies.rectangle(x+d, y+d, d*2, d/3, {label:"hiden",isStatic : true,chamfer: { radius: 2 }})
        this.gate4 = Bodies.rectangle(x+d, y-d, d*2, d/3, {label:"hiden",isStatic : true,chamfer: { radius: 2 }})
        Composite.add(cage,this.gate2)
        Composite.add(cage,this.gate3)
        Composite.add(cage,this.gate4)
      }
    }
    const pivot ={x:width/2, y: height*0.4}
    Composite.translate(balls, pivot)
    Composite.translate(cage, pivot)


    Events.on(engine, 'collisionStart', (ev) => {
      ev.pairs.forEach( p => {
        const g = this.gate2
        if(this.status===1 && (p.bodyA === g || p.bodyB === g)){
          const b = p.bodyA === g ? p.bodyB : p.bodyA
          this.ball = b
          this.status = 2
          //ball catched
          this.statusCallback(this.status,this.ball.number)
          Body.setVelocity(b, {x:0,y:0})
          this.gate1.isSensor = false
          this.ball.isStatic = true
          this.gate2.isSensor = true
        }
        if(this.status===3 && (p.bodyA === this.ball || p.bodyB === this.ball)){
          const other = p.bodyA === this.ball ? p.bodyB : p.bodyA
          if(other === this.pipe){
            // ball ended
            this.status=4
            this.statusCallback(this.status,this.ball.number)
          } else {
            other.hueLeft = 100;
            other.hue = this.hue
          }
        }
      })
    });

    Events.on(engine, 'beforeUpdate',(ev)=>{
      if(this.spinning)
        Composite.rotate(cage, 0.03,cage.bodies[0].position)

      // ball is catched
      if(this.status===2){
        const x = this.gate1.position.x + 0.5* (this.gate2.position.x - this.gate1.position.x)
        const y = this.gate1.position.y + 0.5* (this.gate2.position.y - this.gate1.position.y)
        Body.setPosition(this.ball, {x:x,y:y})
        Body.rotate(this.ball, 0.1)
        const a = this.cage.bodies[0].angle%(Math.PI*2)
        if(a>(Math.PI*7/4)){
          this.ball.isStatic = false
          this.gate3.isSensor = true
          this.gate4.isSensor = true
          const force = { x: 2*Math.random(), y: -2*Math.random()}
          Body.applyForce( this.ball, Vector.clone(this.ball.position), force)
          this.status = 3
          //ball dropped
          this.statusCallback(this.status,this.ball.number)
        }
      }

      //check if a ball has escaped
      this.balls.bodies.filter(b => b!==this.ball).forEach ( b => {
        const x = Math.abs( b.position.x - pivot.x)
        const y = Math.abs( b.position.y - pivot.y)
        const r = radius + 60 // expand radius to gate2
        if(x>r || y >r){
          console.log("ball out",b.label,this.ball,this.gate1.isSensor)
        }
      })

      //ball has been dropped
      if(this.status===3){
        this.trail.unshift({
          hue: this.hue,
          position: Vector.clone(this.ball.position),
          speed: this.ball.speed
        })
      }

      if (this.ball===null || this.trail.length > 100) 
        this.trail.pop()


    })

    //world.gravity = 9
    World.add(world, [this.pipe,cage, balls, walls])
    this.engine = engine
    this.cage = cage
    this.balls = balls
    this.walls = walls

  }

  start(balls){
    this.spinning = true
    this.started = true
    if(balls){
      this.balls.bodies.filter(b=> balls.includes(b.number)).forEach(b => {
        Composite.remove(this.balls,b)
      })
    }
  }

  call(){
    //ignore calls if already called
    if(this.status===0){
      this.spinning = true
      this.gate1.isSensor = true
      this.gate2.isSensor = false
      this.gate3.isSensor = false
      this.gate4.isSensor = false
      this.status = 1
    }
  }

  complete(){
    Composite.remove(this.balls,this.ball)
    this.ball = null
    this.status = 0
  }

  update() {
    if(this.started){
      Engine.update(this.engine, 1000 / 60)
      this.draw()
    }
  }

  draw() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.font = "16px Inconsolata"
    ctx.lineWidth = 1


    //draw pipe, if trail
    if(this.ball){
      this.hue = 250 + Math.round((1 - Math.min(1, this.ball.speed / 30)) * 170)

      ctx.globalAlpha = 0.5
      const vs = this.pipe.vertices
      ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, 55%)'
      ctx.lineWidth = 90
      ctx.beginPath()
      ctx.moveTo(vs[0].x, vs[0].y)
      vs.forEach(v => ctx.lineTo(v.x, v.y))
      ctx.lineTo(vs[0].x, vs[0].y)
      ctx.stroke()    
      ctx.globalAlpha = 1
    }

    ctx.lineWidth = 3
    const cage = this.cage.bodies.filter(b => b.label !== "hiden")
    const wall = this.walls.bodies
    const all = [...cage,...wall]
    all.forEach(b =>{
      ctx.beginPath()
      const vs = b.vertices
      ctx.moveTo(vs[0].x, vs[0].y)
      vs.forEach(v => ctx.lineTo(v.x, v.y))
      ctx.lineTo(vs[0].x, vs[0].y)
      if(b.hueLeft>1){
        ctx.strokeStyle = `hsl(${ b.hue}, ${b.hueLeft}%, 55%)`
        b.hueLeft--
      }
      else
        ctx.strokeStyle = b.isSensor ? '#509eec' : '#666'
      ctx.stroke()    
    })
    ctx.lineWidth = 1

    //draw trail
    ctx.globalAlpha = 0.5
    this.trail.forEach(t => {
      const radius = 15 - Math.min(1, t.speed / 10)*5
      ctx.fillStyle = 'hsl(' + this.hue + ', 100%, 55%)'
      ctx.beginPath();
      ctx.arc(t.position.x, t.position.y,radius, 0, 2 * Math.PI, false)
      ctx.fill()
    })
    ctx.globalAlpha = 1
    


    ctx.beginPath()
    for (var i = 0; i < this.balls.bodies.length; i += 1) {
      var vertices = this.balls.bodies[i].vertices
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (var j = 1; j < vertices.length; j += 1) {
          ctx.lineTo(vertices[j].x, vertices[j].y)
      }
      ctx.lineTo(vertices[0].x, vertices[0].y)
    }
    ctx.strokeStyle = '#ccc'
    ctx.stroke()    

    ctx.fillStyle = '#ccc'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (var i = 0; i < this.balls.bodies.length; i += 1) {
      ctx.save()
      const b = this.balls.bodies[i]
      ctx.translate(b.position.x ,b.position.y )
      ctx.rotate(b.angle)
      ctx.fillText(b.label,0,0)
      ctx.fillRect(-5, 8, 10,1)
      ctx.restore()
    }

  }

}

export default Bingo
