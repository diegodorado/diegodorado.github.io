/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext } from "react"
import { CV2612Context } from "./context"
import { reactLocalStorage } from "reactjs-localstorage"
import MidiIO from "./midi-io"

const activityDuration = 80

const Midi = () => {
  const { state, dispatch } = useContext(CV2612Context)

  const [midiOutId, setMidiOutId] = useState("-")
  const [midiOuts, setMidiOuts] = useState([])
  const [midiOutActivity, setMidiOutActivity] = useState(false)

  useEffect(() => {
    MidiIO.sub("midiStateChanged", onStateChange)
    MidiIO.sub("midiOutProgress", onMidiOutProgress)
    MidiIO.sub("midiLoopback", onLoopBack)

    return () => {
      MidiIO.unsub("midiStateChanged", onStateChange)
      MidiIO.unsub("midiOutProgress", onMidiOutProgress)
      MidiIO.unsub("midiLoopback", onLoopBack)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (midiOutId !== "-") {
      reactLocalStorage.set("midiOutId", midiOutId)
      MidiIO.setMidiOutId(midiOutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiOutId])

  const onMidiOutProgress = ({ done }) => {
    setMidiOutActivity(true)
    if (done) setTimeout(() => setMidiOutActivity(false), activityDuration)
  }

  const onLoopBack = () => {
    setMidiOutId("")
    console.error("Loopback prevented")
  }

  const onStateChange = ({ outputs }) => {
    if (JSON.stringify(midiOuts) !== JSON.stringify(outputs)) {
      const m_out = reactLocalStorage.get("midiOutId", "")
      // is last id still available??
      setMidiOutId(outputs.map(a => a.id).includes(m_out) ? m_out : "")
      setMidiOuts(outputs)
    }
  }

  return (
    <>
      <nav className={`midi`}>
        <span>
          MIDI Out
          <i className={midiOutActivity ? "active" : ""}></i>
        </span>
        {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
        <select
          className="out"
          value={midiOutId}
          onChange={ev => setMidiOutId(ev.target.value)}
        >
          <option key="" value="">
            Not Connected
          </option>
          {midiOuts.map(o => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
        {"xyz".split("").map(i => (
          <a
            href="/"
            title={`Bind parameters to ${i.toUpperCase()}`}
            className={state.activeBinding === i ? "active" : ""}
            onClick={ev => {
              ev.preventDefault()
              dispatch({ type: "toggle-binding", binding: i })
            }}
            key={i}
          >
            {i}
          </a>
        ))}
      </nav>
    </>
  )
}

export default Midi
