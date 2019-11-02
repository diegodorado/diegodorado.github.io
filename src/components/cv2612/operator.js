import React from "react"
import Envelope from "./envelope"
import Slider from "./slider"

const Operator = (props) =>{
  return (
    <div className="operator">
      <Slider name="ar" op={props.op} />
      <Slider name="d1" op={props.op} />
      <Slider name="sl" op={props.op} />
      <Slider name="d2" op={props.op} />
      <Slider name="rr" op={props.op} />
      <Slider name="tl" op={props.op} />
      <Envelope op={props.op} />
      <Slider name="mul" op={props.op} />
      <Slider name="det" op={props.op} />
      <Slider name="rs" op={props.op} />
      <Slider name="am" op={props.op} />
    </div>
  )
}

export default Operator
