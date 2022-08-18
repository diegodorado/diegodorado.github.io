import React from "react"
import Envelope from "./envelope"
import Slider from "./slider"

const Operator = ({ op }) => {
  return (
    <div className="operator">
      <Slider label="ar" cc={30 + op * 10 + 0} bits={5} />
      <Slider label="d1" cc={30 + op * 10 + 1} bits={5} />
      <Slider label="sl" cc={30 + op * 10 + 2} bits={4} />
      <Slider label="d2" cc={30 + op * 10 + 3} bits={5} />
      <Slider label="rr" cc={30 + op * 10 + 4} bits={4} />
      <Slider label="tl" cc={30 + op * 10 + 5} bits={7} />
      <Envelope op={op} />
      <Slider label="mul" cc={30 + op * 10 + 6} bits={4} />
      <Slider label="det" cc={30 + op * 10 + 7} bits={7} />
      <Slider label="rs" cc={30 + op * 10 + 8} bits={2} />
      <Slider label="am" cc={30 + op * 10 + 9} bits={1} />
    </div>
  )
}

export default Operator
