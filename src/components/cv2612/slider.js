import React, {useContext} from "react"
import {CV2612Context} from "./context"
import {bitness} from "./utils/patches-utils"

const Slider = (props) =>{
  const context = useContext(CV2612Context)
  const bits = bitness(props.name)
  const max = Math.pow(2,bits)-1
  const code = (props.op === undefined) ? props.name : `${props.name}_${props.op}`
  const className = 'slider'
    .concat(context.learning ? ' learn' : '')
    .concat(context.activeParameter === code ? ' active' : '')
    .concat(context.mapping[code]!==null ? ' mapped' : '')


  const onChange = (ev) =>{
    ev.preventDefault()
    context.updateParam(code,parseInt(ev.target.value))
    context.setActiveParameter(code)
  }

  const onClick = (ev) =>{
    ev.preventDefault()
    context.setActiveParameter(code)
  }

  return (
    <div className={className} onClick={onClick} aria-hidden="true" >
      <label>{props.name}</label>
      <input type="range" step={1} min={0} max={max} value={context.params[code]} onChange={onChange} />
      <span>
        {context.params[code] + (context.learning ? ` - CC ${context.mapping[code]}`: '') }
      </span>
    </div>
  )
}


export default Slider
