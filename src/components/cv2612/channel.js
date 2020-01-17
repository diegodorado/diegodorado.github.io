import React, {useContext} from "react"
import {CV2612Context} from "./context"
import Operator from "./operator"
import Slider from "./slider"
import algorithmAscii from "./utils/algorithmAscii"

const Channel = (props) =>{
  const context = useContext(CV2612Context)
  return (
    <div className="channel">
      <div className="four-cols">
        <div className="col">
          <Slider name="fb" />
          <Slider name="ams" />
        </div>
        <div className="col">
          <Slider name="st" />
          <Slider name="fms" />
        </div>
        <div className="col">
          <Slider name="al" />
        </div>
        <div className="col">
          <pre className="algorithm">
            {algorithmAscii(context.params['al'])}
          </pre>
        </div>
      </div>
      <div className="four-cols">
        <div className="col"><Operator op={0} /></div>
        <div className="col"><Operator op={2} /></div>
        <div className="col"><Operator op={1} /></div>
        <div className="col"><Operator op={3} /></div>
      </div>
    </div>
  )
}

export default Channel
