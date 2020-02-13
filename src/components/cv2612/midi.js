import React, {useState, useEffect, useContext} from "react"
import {CV2612Context} from "./context"
import {reactLocalStorage} from 'reactjs-localstorage'
import { FaSlidersH} from 'react-icons/fa'
import MidiIO from './midi-io'

const activityDuration = 200

const Midi = () =>{
  const { state, dispatch } = useContext(CV2612Context)

  const [midiInId, setMidiInId] = useState('-')
  const [midiCtrlInId, setMidiCtrlInId] = useState('-')
  const [midiOutId, setMidiOutId] = useState('-')
  const [midiIns, setMidiIns] = useState([])
  const [midiOuts, setMidiOuts] = useState([])
  const [midiInActivity, setMidiInActivity] = useState(false)
  const [midiCtrlInActivity, setMidiCtrlInActivity] = useState(false)
  const [midiOutActivity, setMidiOutActivity] = useState(false)

  useEffect(()=>{
    MidiIO.sub('midiStateChanged', onStateChange)
    MidiIO.sub('midiOutProgress', onMidiOutProgress)
    MidiIO.sub('midiLoopback', onLoopBack)
    MidiIO.sub('midiCtrlInMsg', onMidiCtrlInMsg)
    MidiIO.sub('midiInMsg', onMidiInMsg)

    return () => {
      MidiIO.unsub('midiStateChanged', onStateChange)
      MidiIO.unsub('midiOutProgress', onMidiOutProgress)
      MidiIO.unsub('midiLoopback', onLoopBack)
      MidiIO.unsub('midiCtrlInMsg', onMidiCtrlInMsg)
      MidiIO.unsub('midiInMsg', onMidiInMsg)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(midiCtrlInId !== '-'){
      reactLocalStorage.set('midiCtrlInId',midiCtrlInId)
      MidiIO.setMidiCtrlInId(midiCtrlInId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[midiCtrlInId])


  useEffect(()=>{
    if(midiInId !== '-'){
      reactLocalStorage.set('midiInId',midiInId)
      MidiIO.setMidiInId(midiInId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[midiInId])


  useEffect(()=>{
    if(midiOutId !== '-'){
      reactLocalStorage.set('midiOutId',midiOutId)
      MidiIO.setMidiOutId(midiOutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[midiOutId])

  const onMidiCtrlInMsg = ()=>{
    setMidiCtrlInActivity(true)
    setTimeout(()=>setMidiCtrlInActivity(false), activityDuration)
  }

  const onMidiInMsg = ()=>{
    setMidiInActivity(true)
    setTimeout(()=>setMidiInActivity(false), activityDuration)
  }

  const onMidiOutProgress = ({done}) =>{
    setMidiOutActivity(!done)
  }

  const onLoopBack = () =>{
    setMidiOutId('')
    console.error('Loopback prevented')
  }

  const onStateChange = ({inputs,outputs}) =>{

    if (JSON.stringify(midiIns)!==JSON.stringify(inputs)){
      const m_in = reactLocalStorage.get('midiInId','')
      const c_in = reactLocalStorage.get('midiCtrlInId','')
      // is last id still available??
      setMidiInId(inputs.map(a=>a.id).includes(m_in) ? m_in : '')
      setMidiCtrlInId(inputs.map(a=>a.id).includes(c_in) ? c_in : '')
      setMidiIns(inputs)
    }

    if (JSON.stringify(midiOuts)!==JSON.stringify(outputs)){
      const m_out = reactLocalStorage.get('midiOutId','')
      // is last id still available??
      setMidiOutId(outputs.map(a=>a.id).includes(m_out) ? m_out : '')
      setMidiOuts(outputs)
    }

  }


  const onLearnClick = (e) => {
    e.preventDefault()
    dispatch({ type: "toggle-learning"})
  }

  return (
    <>
    <nav className={`midi`}>
      <span>
        Ctrl
        <i className={midiCtrlInActivity ? 'active':''}></i>
      </span>
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select className="ctrl" value={midiCtrlInId} onChange={(ev) => setMidiCtrlInId(ev.target.value)}>
        <option key="" value="">Not Connected</option>
        {midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
      <span>
        In
        <i className={midiInActivity ? 'active':''}></i>
      </span>
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select className="in" value={midiInId} onChange={(ev) => setMidiInId(ev.target.value)}>
        <option key="" value="">Not Connected</option>
        {midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
      <span>
        Out
        <i className={midiOutActivity ? 'active':''}></i>
        </span>
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select className="out" value={midiOutId} onChange={(ev) => setMidiOutId(ev.target.value)}>
        <option key="" value="">Not Connected</option>
        {midiOuts.map((o) =><option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      <a className={state.learning ? 'learning':''} href="/" title="Click to Learn" onClick={onLearnClick}><FaSlidersH/></a>
    </nav>
    </>
  )

}

export default Midi
