import {
  Engine,
  World,
  Bodies,
  Body,
  Events,
  Composite,
  Vector,
} from 'matter-js'

class Cage {
  constructor(canvas, callback, audioCallback) {
    this.audioCallback = audioCallback
    this.statusCallback = callback
    this.canvas = canvas
    this.lastCycleBalls = 0
    this.status = 0
    this.trail = []
    this.remaining = []
    this.init()
    this.setVfxLevel(2)
  }

  createBall() {
    const x = this.ballRadius * 1.2
    const y = this.ballRadius * 1.2
    return Bodies.circle(x, y, this.ballRadius, {
      density: 0.1,
      friction: 0,
      frictionAir: 0,
      restitution: 0.92,
    })
  }

  addBall() {
    const x = this.pivot.x + 50
    const y = this.pivot.y - 50
    const b = this.createBall()
    Body.setPosition(b, { x: x, y: y })
    Composite.add(this.balls, b)
  }

  init() {
    const engine = Engine.create()
    const world = engine.world
    const width = this.canvas.width
    const height = this.canvas.height
    const radius = this.canvas.width * 0.29
    this.width = width
    this.radius = radius
    this.ballRadius = this.width * 0.02

    const walls = Composite.create()
    const w = width * 0.1
    Composite.add(
      walls,
      Bodies.rectangle(width / 2, 0 - w / 2, width, w, { isStatic: true })
    )
    Composite.add(
      walls,
      Bodies.rectangle(width - 1 + w / 2, height / 2, w, height, {
        isStatic: true,
      })
    )
    Composite.add(
      walls,
      Bodies.rectangle(2 - w / 2, height / 2, w, height, { isStatic: true })
    )
    Composite.add(
      walls,
      Bodies.rectangle(width / 2, height - 1 + w / 2, width, w, {
        isStatic: true,
      })
    )
    Composite.add(
      walls,
      Bodies.polygon(width * 1, height * 0.85, 4, width * 0.25, {
        angle: 0.25 * Math.PI,
        isStatic: true,
      })
    )
    Composite.add(
      walls,
      Bodies.polygon(width * 0.7, height * 1.1, 4, width * 0.4, {
        angle: 0.45 * Math.PI,
        isStatic: true,
      })
    )
    Composite.add(
      walls,
      Bodies.polygon(width * 0.4, height * 1.11, 4, width * 0.25, {
        angle: 0.25 * Math.PI,
        isStatic: true,
      })
    )
    Composite.add(
      walls,
      Bodies.polygon(width * 0.4, height * 1.11, 4, width * 0.25, {
        angle: 0.25 * Math.PI,
        isStatic: true,
      })
    )

    this.pipe = Bodies.polygon(0, height, 3, 50, {
      angle: Math.PI,
      isSensor: true,
      isStatic: true,
    })

    const pivot = { x: width / 2, y: height * 0.4 }

    Events.on(engine, 'collisionStart', (ev) => {
      ev.pairs.forEach((p) => {
        if (
          this.status === 3 &&
          (p.bodyA === this.ball || p.bodyB === this.ball)
        ) {
          const other = p.bodyA === this.ball ? p.bodyB : p.bodyA
          if (other === this.pipe) {
            // ball ended
            this.status = 4
            this.statusCallback(this.status, this.number)
          } else {
            other.hueLeft = 100
            other.hue = this.hue
            const v = Math.min(1, this.ball.speed / 15)
            this.audioCallback(v)
          }
        }
      })
    })

    Events.on(engine, 'beforeUpdate', () => {
      if (this.vfx === 3) Composite.rotate(this.cage, 0.03, this.pivot)
      this.angle += 0.03

      // auto catch a ball
      if (this.status === 1) {
        const a = this.angle % (Math.PI * 2)
        if (a > Math.PI * 0.5 && a < Math.PI * 0.6) {
          this.catch()
        }
      }

      // ball is catched
      if (this.status === 2) {
        const x = pivot.x + Math.cos(this.angle) * (this.radius + 30)
        const y = pivot.y + Math.sin(this.angle) * (this.radius + 30)
        Body.setPosition(this.ball, { x: x, y: y })
        Body.rotate(this.ball, 0.1)
        const a = this.angle % (Math.PI * 2)
        if (a > (Math.PI * 7) / 4) {
          const force = { x: 2 * Math.random(), y: -2 * Math.random() }
          const pos = { x: x, y: y }
          const n =
            this.remaining[Math.floor(Math.random() * this.remaining.length)]
          this.throw(n, pos, force)
        }
      }

      if (this.vfx > 1) {
        //ball has been dropped
        if (this.status === 3) {
          this.trail.unshift({
            hue: this.hue,
            position: Vector.clone(this.ball.position),
            radius: 15 - Math.min(1, this.ball.speed / 10) * 5,
          })
        }

        // eat that trail
        if (this.status === 0 || this.trail.length > 100) this.trail.pop()
      }

      if (this.vfx === 3) {
        //check if a ball has escaped
        this.balls.bodies.forEach((b) => {
          const x = Math.abs(b.position.x - pivot.x)
          const y = Math.abs(b.position.y - pivot.y)
          const r = radius + 60 // expand radius to gate2
          if (x > r || y > r) {
            Body.setPosition(b, { x: pivot.x, y: pivot.y + 30 })
          }
        })
      }
    })

    this.ball = this.createBall()
    this.ball.isStatic = true
    this.cage = Composite.create()
    this.balls = Composite.create()
    this.walls = walls
    World.add(world, [this.ball, this.pipe, this.cage, this.balls, this.walls])
    this.engine = engine
    this.pivot = pivot
    this.angle = 0
    this.number = 0
  }

  setVfxLevel(level) {
    const d = this.width * 0.033
    this.vfx = level
    this.angle = 0

    Composite.clear(this.cage)
    Composite.clear(this.balls)

    if (level === 3) {
      Composite.add(
        this.cage,
        Bodies.rectangle(0, 0, d / 2, d / 2, { isStatic: true })
      )
      Composite.add(
        this.cage,
        Bodies.polygon(d * 1.25 - this.radius, 0, 3, d * 1.5, {
          angle: Math.PI,
          isStatic: true,
        })
      )
      const sides = 20
      const angle = (Math.PI * 2) / sides
      const side = 2 * Math.sin(angle / 2) * this.radius
      for (let i = 0; i < sides; i++) {
        const a = angle * i
        const x = Math.cos(a) * this.radius
        const y = Math.sin(a) * this.radius
        const b = Bodies.rectangle(x, y, d, side, { isStatic: true, angle: a })
        Composite.add(this.cage, b)
        if (i === 0) this.gate = b
      }
      Composite.translate(this.cage, this.pivot)
    } else {
      Composite.add(
        this.cage,
        Bodies.circle(0, 0, this.radius + d / 2, { isStatic: true })
      )
      Composite.translate(this.cage, this.pivot)
    }
  }

  catch() {
    this.status = 2
    //ball catched
    Body.setVelocity(this.ball, { x: 0, y: 0 })
    this.ball.isStatic = true
    this.statusCallback(this.status, this.number)
  }

  throw(n, p, f) {
    this.status = 3
    //remove this number from remaining list
    this.remaining = this.remaining.filter((x) => x !== n)
    this.number = n
    this.ball.isStatic = false
    Body.setPosition(this.ball, p)
    Body.applyForce(this.ball, p, f)
    //ball dropped
    this.statusCallback(this.status, this.number, p, f)
  }

  start(remaining) {
    this.remaining = remaining
  }

  call() {
    //ignore calls if already called
    if (this.status === 0 && this.remaining.length > 0) {
      this.status = 1
    }
  }

  complete() {
    this.number = 0
    this.status = 0
    this.ball.isStatic = true
  }

  update() {
    if (this.vfx > 0) {
      Engine.update(this.engine, 1000 / 60)
      this.draw()
      if (this.vfx === 3) this.cycleBalls()
    }
  }

  cycleBalls() {
    const maxBalls = Math.min(20, this.remaining.length)
    const t = performance.now()
    const dt = t - this.lastCycleBalls
    if (dt > 200) {
      this.lastCycleBalls = t
      if (this.balls.bodies.length > maxBalls) {
        Composite.remove(this.balls, this.balls.bodies[0])
      } else {
        if (this.balls.bodies.length < maxBalls) this.addBall()
      }
    }
  }

  draw() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.font = '16px Inconsolata'
    ctx.lineWidth = 1

    const drawBody = (b) => {
      if (b.circleRadius) drawCircle(b.position, b.circleRadius)
      else {
        drawPoly(b.vertices)
      }
    }

    const drawCircle = (p, r) => {
      ctx.moveTo(p.x + r, p.y)
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
    }

    const drawPoly = (vs) => {
      ctx.moveTo(vs[0].x, vs[0].y)
      vs.forEach((v) => ctx.lineTo(v.x, v.y))
      ctx.lineTo(vs[0].x, vs[0].y)
    }

    const drawTrail = () => {
      ctx.fillStyle = 'hsl(' + this.hue + ', 100%, 55%)'
      ctx.beginPath()
      this.trail.forEach((t) => drawCircle(t.position, t.radius))
      ctx.fill()
    }

    const drawHueBodies = (bodies) => {
      bodies
        .filter((b) => b.hueLeft > 1)
        .forEach((b) => {
          ctx.beginPath()
          b.hueLeft--
          ctx.strokeStyle = `hsl(${b.hue}, ${b.hueLeft}%, 55%)`
          drawBody(b)
          ctx.stroke()
        })
    }

    if (this.status !== 0 || this.trail.length > 0) {
      //draw pipe, if trail
      ctx.globalAlpha = 0.5
      this.hue = 250 + Math.round((1 - Math.min(1, this.ball.speed / 30)) * 170)
      ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, 55%)'
      ctx.lineWidth = 90
      ctx.beginPath()
      drawBody(this.pipe)
      ctx.stroke()
      if (this.vfx > 1) drawTrail()
      ctx.globalAlpha = 1
    }

    ctx.lineWidth = 3
    ctx.strokeStyle = '#666'
    ctx.beginPath()
    this.walls.bodies.forEach((b) => drawBody(b))
    this.cage.bodies.forEach((b) => drawBody(b))
    if (this.status !== 1 && this.vfx < 3) {
      const b = this.cage.bodies[0]
      const p = b.position
      const x = p.x + Math.cos(this.angle) * this.radius
      const y = p.y + Math.sin(this.angle) * this.radius
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(x, y)
    }
    ctx.stroke()

    if (this.status === 1) {
      ctx.strokeStyle = '#509eec'
      ctx.beginPath()
      if (this.vfx === 3) {
        drawBody(this.gate)
      } else {
        const b = this.cage.bodies[0]
        const p = b.position
        const x = p.x + Math.cos(this.angle) * b.circleRadius
        const y = p.y + Math.sin(this.angle) * b.circleRadius
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    } else {
      drawHueBodies(this.walls.bodies)
      drawHueBodies(this.cage.bodies)
    }

    if (this.vfx === 3) {
      ctx.lineWidth = 1
      ctx.beginPath()
      this.balls.bodies.forEach((b) => drawBody(b))
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }

    if (this.status > 1) {
      const b = this.ball
      const p = b.position
      ctx.lineWidth = 1
      ctx.beginPath()
      drawBody(b)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
      ctx.fillStyle = '#ccc'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(b.angle)
      ctx.fillText(this.number, 0, 0)
      ctx.fillRect(-5, 8, 10, 1)
      ctx.restore()
    }
  }
}

export default Cage
