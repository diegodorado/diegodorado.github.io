import React, {useContext} from "react"
import {CV2612Context} from "./context"

const Dropdown = (props) =>{
  const context = useContext(CV2612Context)
  const m = context.mapping[props.code]

  const mapped = ( (m.ch && m.cc)!==null)
  const className = 'dropdown slider'
    .concat(context.learning ? ' learn' : '')
    .concat(context.activeParameter === props.code ? ' active' : '')
    .concat(mapped ? ' mapped' : '')



  const onChange = (ev) =>{
    ev.preventDefault()
    context.updateParam(props.code,parseInt(ev.target.value))
    context.setActiveParameter(props.code)
  }

  const onClick = (ev) =>{
    ev.preventDefault()
    context.setActiveParameter(props.code)
  }

  return (
    <div className={className} onClick={onClick} >
      <label>{props.name}</label>
      <input type="range" step={1} min={0} max={props.max} value={context.params[props.code]} onChange={onChange} />
      <span>
        {context.params[props.code] + (context.learning ? (mapped ? ` - ${m.ch}:${m.cc}` : ' - n/a'): '') }
      </span>
    </div>
  )
}


export default Dropdown
