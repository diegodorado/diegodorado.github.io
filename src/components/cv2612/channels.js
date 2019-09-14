import React, {useContext} from "react"
import {CV2612Context} from "./context"
import Channel from "./channel"
import Slider from "./slider"
import Dropdown from "./dropdown"
import CvInput from "./cv_input"



const Channels = (props) =>{
  const context = useContext(CV2612Context)

  const onFilterChannel = (ev) => {
    ev.preventDefault()
    const ch = parseInt(ev.target.attributes.ch.value)
    context.filterChannel(ch)
  }

  const sendVoice = (ev) => {
    ev.preventDefault()
    const v = parseInt(ev.target.attributes.ch.value)
    context.sendVoice(v)
  }

  const sendMapping = (ev) => {
    ev.preventDefault()
    //context.sendVoice(v)
  }



  return (
      <>
        <div className="globals">
          <h5>Globals</h5>
          <table>
            <tbody>
              <tr>
                <td>
                  <Dropdown name="play_mode" code="play_mode" max={1}/>
                  <Dropdown name="vel_sensitivity" code="vel_sensitivity" max={1}/>
                  <Dropdown name="cc_mode" code="cc_mode" max={2}/>
                  <Dropdown name="rgb_intensity" code="rgb_intensity" max={127}/>
                  <Slider name="lfo"/>
                  <Slider name="en" />
                </td>
                <td>
                  <CvInput code="X"/>
                  <CvInput code="Y"/>
                  <CvInput code="Z"/>
                </td>
                <td>
                  <ul>
                    <li><a href="/" onClick={sendMapping} >Upload Mapping</a></li>
                  </ul>
                </td>
                <td>
                  <ul>
                    {[0,1,2,3,4,5].map(i => <li key={i}><a href="/"  ch={i} onClick={sendVoice} >{`Send Voice ${i+1}` }</a></li>)}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <nav>
          {[0,1,2,3,4,5].map(i => <a href="/" className={context.filters.ch === i ? 'active':'' } key={i} ch={i} onClick={onFilterChannel} title={`Show channel ${i+1}` }>{`${i+1}` }</a>)}
        </nav>
        <Channel />
      </>
  )


}

export default Channels
