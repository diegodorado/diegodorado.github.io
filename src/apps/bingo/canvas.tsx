import React, { useState, useEffect, useRef } from 'react'
import Cage from './cage'
import { startPiano, Piano } from './piano'
import { FaCog } from 'react-icons/fa'
import { useBingo } from './useBingo'

const Canvas = ({ onlyMusic = false }) => {
  const canvasRef = useRef(null)
  const rafRef = useRef<number>()
  const cageRef = useRef<Cage>()
  const pianoRef = useRef<Piano>()
  const [configOpen, setConfigOpen] = useState(false)
  const [pianoOn, setPianoOn] = useState(true)
  const [pianoScale, setPianoScale] = useState(0)
  const [autoCall, setAutoCall] = useState(false)
  const [vfx, setVfx] = useState(2)
  const [mayCall, setMayCall] = useState(true)
  const { match, ballsMax, addBall } = useBingo()

  useEffect(() => {
    //todo: async wrapper uselles unless i need something after
    //fixme: pianoRef may be null on some callbacks
    ;(async () => {
      pianoRef.current = await startPiano()
    })()

    const draw = () => {
      cageRef.current?.update()
      rafRef.current = requestAnimationFrame(draw)
    }

    const onBingoStatusChanged = (status: number, number: number) => {
      if (status === 2) pianoRef.current?.playStart()
      if (status === 3) {
      }
      if (status === 4) {
        if (!onlyMusic) addBall(number)
        pianoRef.current?.playEnd()
        cageRef.current?.complete()
        setTimeout(() => {
          setMayCall(true)
          if (cageRef.current?.automatic) cageRef.current?.call()
        }, 2000)
      }
    }

    const onCollisionBall = () => {
      pianoRef.current?.playRandomNote()
    }

    cageRef.current = new Cage(
      canvasRef.current,
      onBingoStatusChanged,
      onCollisionBall
    )

    const allNums = [...Array(ballsMax()).keys()].map((x) => x + 1)
    const remaining = allNums.filter((x) => !match?.balls.includes(x))
    cageRef.current.start(remaining)

    //draw first frame
    cageRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
    /* eslint-disable-next-line */
  }, []) // Make sure the effect runs only once
  //fixme: see how to make this right
  //}, [addBall,balls, ballsMax, onlyMusic]) // Make sure the effect runs only once

  const onTogglePiano = () => {
    const on = !pianoOn
    setPianoOn(on)
    if (pianoRef.current) pianoRef.current.muted = on
  }

  const onClickPianoScale = () => {
    const s = (pianoScale + 1) % 4
    setPianoScale(s)
    if (pianoRef.current) pianoRef.current.setScale(s)
  }

  const onToggleAutomatic = () => {
    const a = !autoCall
    setAutoCall(a)
    if (cageRef.current) cageRef.current.automatic = a
    if (a) onCallClick()
  }

  const onClickVfx = () => {
    const l = (vfx + 1) % 4
    setVfx(l)
    if (cageRef.current) cageRef.current.setVfxLevel(l)
  }

  const onCallClick = () => {
    setMayCall(false)
    cageRef.current?.call()
  }

  const toggleConfig = () => setConfigOpen(!configOpen)

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={600} height={600} />
      <div className="buttons">
        {configOpen && (
          <div className="config">
            <button onClick={onToggleAutomatic}>
              {autoCall ? 'AUTOMATIC' : 'MANUAL'}
            </button>
            <button className={pianoOn ? 'on' : ''} onClick={onTogglePiano}>
              {pianoOn ? 'MUSIC ON' : 'MUSIC OFF'}
            </button>
            <button onClick={onClickPianoScale}>{` ${
              ['PENTATONIC', 'DORIAN', 'ONIRIC', 'ARABIC'][pianoScale]
            }`}</button>
            <button
              className={vfx !== 0 ? 'on' : ''}
              onClick={onClickVfx}
            >{`VFX ${['OFF', 'LOW', 'MID', 'HIGH'][vfx]}`}</button>
          </div>
        )}
        {!autoCall && mayCall && <button onClick={onCallClick}>LANZAR</button>}
        <button className={configOpen ? 'on' : ''} onClick={toggleConfig}>
          {configOpen ? <FaCog /> : <FaCog />}
        </button>
      </div>
    </div>
  )
}

export default Canvas
