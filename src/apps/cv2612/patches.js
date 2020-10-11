/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useContext} from "react"
import { FaCaretLeft,FaCaretRight} from 'react-icons/fa'
import {CV2612Context} from "./context"

const Patches = () =>{
  const { state, dispatch } = useContext(CV2612Context)

  const onChange = (ev) => {
    dispatch({ type: "change-patch", patchIndex: parseInt(ev.target.value,10)})
    ev.target.blur()
  }

  const onLeftClick = (e) => {
    e.preventDefault()
    dispatch({ type: "prev-patch"})
  }

  const onRightClick = (e) => {
    e.preventDefault()
    dispatch({ type: "next-patch"})
  }

  return (
    <nav>
      <a href="/" title="Previous Patch" onClick={onLeftClick}><FaCaretLeft/></a>
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select value={state.patchIndex} onChange={onChange}>
        {state.patches.map((p,i) =><option key={i} value={i}>{p.name}</option>)}
      </select>
      <a href="/" title="Next Patch" onClick={onRightClick}><FaCaretRight/></a>
    </nav>
  )
}


export default Patches
