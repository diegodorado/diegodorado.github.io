import React, {useContext} from "react"
import {CV2612Context} from "./context"

const CvInput = (props) =>{
  const context = useContext(CV2612Context)
  const className = 'cv-input'
    .concat(context.learning ? ' learn' : '')
    .concat(context.activeParameter === props.code ? ' active' : '')
    .concat(context.mapping[props.code]!==null ? ' mapped' : '')

  const onClick = (ev) =>{
    ev.preventDefault()
    context.setActiveParameter(props.code)
  }

  return (
    <div className={className} onClick={onClick} >
      <span>
        {`${props.code} ${context.params[props.code]}` + (context.learning ? ` - CC: ${context.mapping[props.code]}`: '') }
      </span>
    </div>
  )
}


export default CvInput
