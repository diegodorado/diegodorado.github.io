/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react"
import { CV2612Context } from "./context"

const Slider = ({ label, cc, bits, noChannel = false }) => {
  const { state, dispatch } = useContext(CV2612Context)

  // get the cc channel
  const ch = noChannel ? 0 : state.channelIdx

  const patch = state.patches[state.patchIdx]
  const ccs = patch[ch]

  const max = 127 >> (7 - bits)
  const className = "slider".concat(state.activeBinding ? " learn" : "")
  // .concat(state.mapping[code] !== null ? " mapped" : "")
  const value = ccs[cc] >> (7 - bits)

  const onChange = ev => {
    ev.preventDefault()
    const val = parseInt(ev.target.value) << (7 - bits)

    dispatch({
      type: "update-param",
      ch,
      cc,
      val,
    })
    // dispatch({ type: "active-param", code: code })
  }

  const onClick = ev => {
    ev.preventDefault()
    // dispatch({ type: "active-param", code: code })
  }

  return (
    <div className={className} onClick={onClick} aria-hidden="true">
      <label>{label}</label>
      <input
        type="range"
        step={1}
        min={0}
        max={max}
        value={value}
        onChange={onChange}
      />
      <span>{value}</span>
    </div>
  )
}

export default Slider
