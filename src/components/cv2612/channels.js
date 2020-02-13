import React, {useContext} from "react"
import Channel from "./channel"
import Slider from "./slider"
import Scene from "./scene"
import {CV2612Context} from "./context"


const Channels = (props) =>{
  const { state, dispatch } = useContext(CV2612Context)

  const onSelectVoice = (ev) => {
    ev.preventDefault()
    const v = parseInt(ev.target.attributes.voice.value, 10)
    dispatch({ type: "change-voice", voiceIndex: v})
  }

  return (
      <>
        <div className="globals">
          <Scene/>
          <div className="four-cols">
            <div className="col">
              <Slider name="lfo"/>
            </div>
            <div className="col">
              <Slider name="play-mode" />
            </div>
            <div className="col">
              <Slider name="vel-sensitivity" />
              {/*
                <Slider name="cc-mode"/>
                */}
            </div>
            <div className="col">
              <Slider name="rgb-intensity"/>
            </div>
          </div>
        </div>
        <nav>
          {[0,1,2,3,4,5].map(i => <a href="/" className={state.voiceIndex === i ? 'active':'' } key={i} voice={i} onClick={onSelectVoice} title={`Show voice ${i+1}` }>{`${i+1}` }</a>)}
        </nav>
        <Channel />
      </>
  )


}

export default Channels
