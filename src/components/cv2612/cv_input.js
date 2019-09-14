import React, {useContext} from "react"
import {CV2612Context} from "./context"

const CvInput = (props) =>{
  const context = useContext(CV2612Context)
  const m = context.mapping[props.code]
  const mapped = ( (m.ch && m.cc)!==null)
  const className = 'cv-input'
    .concat(context.learning ? ' learn' : '')
    .concat(context.activeParameter === props.code ? ' active' : '')
    .concat(mapped ? ' mapped' : '')

  const onClick = (ev) =>{
    ev.preventDefault()
    context.setActiveParameter(props.code)
  }

  return (
    <div className={className} onClick={onClick} >
      <span>
        {props.code + (context.learning ? (mapped ? ` - ${m.ch}:${m.cc}` : ' - n/a'): '') }
      </span>
    </div>
  )
}


export default CvInput
