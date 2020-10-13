/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useContext} from "react"
import { FaCaretLeft,FaCaretRight} from 'react-icons/fa'
import {CV2612Context} from "./context"

const Presets = () =>{
  const { state, dispatch } = useContext(CV2612Context)

  const onChange = (ev) => {
    dispatch({ type: "change-preset", index: parseInt(ev.target.value,10)})
    ev.target.blur()
  }

  const onLeftClick = (e) => {
    e.preventDefault()
    dispatch({ type: "prev-preset"})
  }

  const onRightClick = (e) => {
    e.preventDefault()
    dispatch({ type: "next-preset"})
  }

  return (
    <nav>
      <span>PRESETS</span>
      <a href="/" title="Previous Preset" onClick={onLeftClick}><FaCaretLeft/></a>
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select value={state.presetIdx} onChange={onChange}>
        {state.presets.map((p,i) =><option key={i} value={i}>{p.name}</option>)}
      </select>
      <a href="/" title="Next Preset" onClick={onRightClick}><FaCaretRight/></a>
    </nav>
  )
}


export default Presets
