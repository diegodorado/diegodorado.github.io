import React, {useState, useEffect} from "react"
import scheduler from './scheduler'

let canvasCtx = null
let stopAnimation = false

const Canvas = () =>{
  let canvasRef = React.createRef()
  const [width, setWidth] = useState(1)
  const [height, setHeight] = useState(1)

  useEffect(()=>{
    canvasCtx = canvasRef.current.getContext("2d")
    canvasCtx.lineWidth = 2
    canvasCtx.fillStyle = 'blue'
    canvasCtx.font = 'bold 100px Arial'
    window.addEventListener('resize', onWindowResize)
    requestAnimationFrame(tick)
    onWindowResize()

    return () => {
      window.removeEventListener('resize', onWindowResize)
      stopAnimation = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onWindowResize = () =>{
    setWidth(window.innerWidth)
    setHeight(window.innerHeight/2)
  }

  const tick = () => {
    if (stopAnimation)
       return
    draw()
    requestAnimationFrame(tick)
  }

  const draw = () =>{
    const w = canvasCtx.canvas.width
    const h = canvasCtx.canvas.height
    canvasCtx.clearRect(0, 0, w, h)
    canvasCtx.font = `${w/10}px Arial`

    for(let i = scheduler.glyphs.length-1; i >= 0 ; i--){
      const g = scheduler.glyphs[i]
      g.life = g.life*1.2
      canvasCtx.fillText(g.emoji, w*g.offset, (h / 2)-g.life)
      if(g.life>10){
        scheduler.glyphs.splice(i, 1)
      }
    }
  }

  return <canvas ref={canvasRef} width={width} height={height} />
}


export default Canvas
