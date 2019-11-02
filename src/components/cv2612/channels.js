import React, {useContext} from "react"
import {CV2612Context} from "./context"
import Channel from "./channel"
import Slider from "./slider"
import CvInput from "./cv_input"



const Channels = (props) =>{
  const context = useContext(CV2612Context)

  const onSelectVoice = (ev) => {
    ev.preventDefault()
    const v = parseInt(ev.target.attributes.voice.value)
    context.selectVoice(v)
  }

  const sendVoice = (ev) => {
    ev.preventDefault()
    context.sendVoice()
  }

  const sendPatch = (ev) => {
    ev.preventDefault()
    //context.sendVoice(v)
  }

  const sendMapping = (ev) => {
    ev.preventDefault()
    //context.sendVoice(v)
  }



  return (
      <>
        <div className="globals">
          <h5>Globals</h5>
          <div className="four-cols">
            <div className="col">
              <Slider name="lfo"/>
              <Slider name="play-mode" />
              <Slider name="vel-sensitivity" />
            </div>
            <div className="col">
              <Slider name="cc-mode"/>
              <Slider name="rgb-intensity"/>
            </div>
            <div className="col">
              <CvInput code="x"/>
              <CvInput code="y"/>
              <CvInput code="z"/>
            </div>
            <div className="col">
              <ul>
                <li><a href="/"  onClick={sendVoice} >Send Voice</a></li>
                <li><a href="/"  onClick={sendPatch} >Send Patch</a></li>
                <li><a href="/" onClick={sendMapping} >Send Mapping</a></li>
              </ul>
            </div>
          </div>
        </div>
        <nav>
          {[0,1,2,3,4,5].map(i => <a href="/" className={context.voice === i ? 'active':'' } key={i} voice={i} onClick={onSelectVoice} title={`Show voice ${i+1}` }>{`${i+1}` }</a>)}
        </nav>
        <Channel />
      </>
  )


}

export default Channels
