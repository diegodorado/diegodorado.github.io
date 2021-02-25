import React, {useState, useEffect,useRef} from "react"
import Bingo from "../../components/bingo/bingo"
import {startPiano} from "../../components/bingo/piano"
import { FaCog} from 'react-icons/fa'
import useBingo from "./useBingo"

const Canvas = ({onlyMusic=false}) => {

  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)
  const pianoRef = useRef(null)
  const [configOpen, setConfigOpen] = useState(false)
  const [pianoOn, setPianoOn] = useState(true)
  const [pianoScale, setPianoScale] = useState(0)
  const [autoCall, setAutoCall] = useState(false)
  const [vfx, setVfx] = useState(2)
  const [mayCall, setMayCall] = useState(true)
  const {balls, ballsMax, addBall} = useBingo()

  useEffect(() => {
    //todo: async wrapper uselles unless i need something after
    //fixme: pianoRef may be null on some callbacks
    (async () => {
      pianoRef.current = await startPiano()
    })()

    const draw = time => {
      const bingo = bingoRef.current
      bingo.update()
      rafRef.current = requestAnimationFrame(draw)
    }

    const onBingoStatusChanged = (status,number, position, force) => {
      if(status===2)
        pianoRef.current.playStart()
      if(status===3){
      }
      if(status===4){
        if(!onlyMusic)
          addBall(number)
        pianoRef.current.playEnd()
        bingoRef.current.complete()
        setTimeout( ()=> {
          setMayCall(true)
          if(bingoRef.current.automatic)
            bingoRef.current.call()
        },2000)
      }
    }

    const onCollisionBall = () => {
      if(pianoRef.current)
        pianoRef.current.playRandomNote()
    }

    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged, onCollisionBall)

    const allNums = [...Array(ballsMax()).keys()].map(x => x+1)
    const remaining = allNums.filter(x=> !balls.includes(x))
    bingoRef.current.start(remaining)

    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once
  //fixme: see how to make this right
  //}, [addBall,balls, ballsMax, onlyMusic]) // Make sure the effect runs only once

  const onTogglePiano = () => {
    const on = !pianoOn
    setPianoOn(on)
    if(pianoRef.current)
      pianoRef.current.muted = on
  }

  const onClickPianoScale = () => {
    const s = (pianoScale+1)%4
    setPianoScale(s)
    if(pianoRef.current)
      pianoRef.current.setScale(s)
  }

  const onToggleAutomatic = () => {
    const a = !autoCall
    setAutoCall(a)
    if(bingoRef.current)
      bingoRef.current.automatic = a
    if(a)
      onCallClick()
  }

  const onClickVfx = () => {
    const l = (vfx+1)%4
    setVfx(l)
    if(bingoRef.current)
      bingoRef.current.setVfxLevel(l)
  }

  const onCallClick = () => {
    setMayCall(false)
    bingoRef.current.call()
  }

  const toggleConfig = () => setConfigOpen(!configOpen)

  return (
          <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600} />
            <div className="buttons">
              {configOpen && (
                 <div className="config">
                    <button onClick={onToggleAutomatic}>{autoCall ? 'AUTOMATIC' : 'MANUAL'}</button>
                    <button className={pianoOn ? 'on':''} onClick={onTogglePiano}>{pianoOn ? 'MUSIC ON':'MUSIC OFF'}</button>
                    <button onClick={onClickPianoScale}>{` ${['PENTATONIC','DORIAN','ONIRIC','ARABIC'][pianoScale]}`}</button>
                    <button className={vfx!==0 ? 'on':''} onClick={onClickVfx}>{`VFX ${['OFF','LOW','MID','HIGH'][vfx]}`}</button>
                </div>
              )}
              {!autoCall && mayCall && <button onClick={onCallClick}>LANZAR</button>}
              <button className={configOpen?'on':''} onClick={toggleConfig}>{configOpen? <FaCog/> : <FaCog/>}</button>
            </div>
          </div>
          )

}

export default Canvas
