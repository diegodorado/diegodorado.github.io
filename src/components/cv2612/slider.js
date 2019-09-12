import React, {useContext} from "react"
import {CV2612Context} from "./context"
import {bitness} from "./utils/patches-utils"

const Slider = (props) =>{
  const context = useContext(CV2612Context)
  const bits = bitness(props.name)
  const max = Math.pow(2,bits)-1
  const ch = [`lfo`,`en`].includes(props.name) ? 6 : context.filters.ch
  const op = (props.op !== undefined) ? props.op : 4
  const code = `${ch}_${op}_${props.name}`
  const m = context.mapping[code]
  const mapped = ( (m.ch && m.cc)!==null)
  const className = 'slider'
    .concat(context.learning ? ' learn' : '')
    .concat(context.activeParameter === code ? ' active' : '')
    .concat(mapped ? ' mapped' : '')


  const onChange = (ev) =>{
    ev.preventDefault()
    context.updateParam(ch, op, props.name, code,parseInt(ev.target.value))
    context.setActiveParameter(code)
  }

  const onClick = (ev) =>{
    ev.preventDefault()
    context.setActiveParameter(code)
  }

  return (
    <div className={className} onClick={onClick} >
      <label>{props.name}</label>
      <input type="range" step={1} min={0} max={max} value={context.params[code]} onChange={onChange} />
      <span>
        {context.params[code] + (context.learning ? (mapped ? ` - ${m.ch}:${m.cc}` : ' - n/a'): '') }
      </span>
    </div>
  )
}


export default Slider
