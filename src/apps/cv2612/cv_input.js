import React, {useContext} from "react"
import {CV2612Context} from "./context"

const CvInput = (props) =>{
  const { state, dispatch } = useContext(CV2612Context)

  const className = 'cv-input'
    .concat(state.learning ? ' learn' : '')
    .concat(state.activeParameter === props.code ? ' active' : '')
    .concat(state.mapping[props.code]!==null ? ' mapped' : '')

  const onClick = (ev) =>{
    ev.preventDefault()
    dispatch({ type: "active-param", code: props.code })
  }

  return (
    <div className={className} onClick={onClick} aria-hidden="true">
      <span>
        {`${props.code} - CC: ${state.mapping[props.code]}`}
      </span>
    </div>
  )
}


export default CvInput
