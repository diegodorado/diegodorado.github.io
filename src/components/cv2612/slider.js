/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useContext} from "react"
import {CV2612Context} from "./context"
import {bitness} from "./utils/patches-utils"

const Slider = (props) =>{
  const { state, dispatch } = useContext(CV2612Context)

  const bits = bitness(props.name)
  const max = Math.pow(2,bits)-1
  const code = (props.op === undefined) ? props.name : `${props.name}_${props.op}`
  const className = 'slider'
    .concat(state.learning ? ' learn' : '')
    .concat(state.activeParameter === code ? ' active' : '')
    .concat(state.mapping[code]!==null ? ' mapped' : '')


  const onChange = (ev) =>{
    ev.preventDefault()
    dispatch({ type: "update-param", code: code, value: parseInt(ev.target.value) })
    dispatch({ type: "active-param", code: code })
  }

  const onClick = (ev) =>{
    ev.preventDefault()
    dispatch({ type: "active-param", code: code })
  }

  return (
    <div className={className} onClick={onClick} aria-hidden="true" >
      <label>{props.name}</label>
      <input type="range" step={1} min={0} max={max} value={state.params[code]} onChange={onChange} />
      <span>
        {state.params[code] + (state.learning ? ` - CC ${state.mapping[code]}`: '') }
      </span>
    </div>
  )
}


export default Slider
