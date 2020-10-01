import React, {useState, useEffect,useRef,useContext} from "react"
import {BingoContext} from "./context"
import Context from "../../components/context"
import Bingo from "../../components/bingo/bingo"
import {startPiano} from "../../components/bingo/piano"
import { FaCog} from 'react-icons/fa'

const Canvas = ({onlyMusic=false}) => {
  const { state,dispatch } = useContext(BingoContext)
  const { state: globalState } = useContext(Context)

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

  const updateBalls = async (ball) => {

    if(onlyMusic)
      return

    dispatch({ type: 'START_FETCH' })
    try{
      const ballsService = globalState.api.service('bingo-balls')
      const match = await ballsService.patch(state.match._id,{ball})
      dispatch({ type: 'END_FETCH',match })
    }catch(error){
      dispatch({ type: 'END_FETCH',error })
    }
  }

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
        //todo: send this ball
        updateBalls(number)
        dispatch({type:'BALL', ball: number})
        pianoRef.current.playEnd()
        bingoRef.current.complete()
        setTimeout( ()=> {
          dispatch({type:'BALL', ball: null})
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

    if(onlyMusic){
      const remaining = [...Array(90).keys()]
      bingoRef.current.start(remaining)
    }
    else{
      const allNums = [...Array((state.match.style === 'bingo90' ? 90 : 75)).keys()]
      const remaining = allNums.map(x => x+1).filter(x=> !state.match.balls.includes(x))
      bingoRef.current.start(remaining)
    }

    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

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
