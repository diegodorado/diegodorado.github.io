import React, {useContext} from "react"
import {CV2612Context} from "./context"
import CvInput from "./cv_input"

const Scene = (props) =>{
  const { state, dispatch } = useContext(CV2612Context)

  const max = 1023
  const code = 'scene'
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

  /*
  const onSelectScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)*256+127
    dispatch({ type: "update-param", code: code, value: s })
    dispatch({ type: "active-param", code: code })
  }
  */

  const storeScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    dispatch({ type: "update-param", code: code, value: s*256+127 })
    dispatch({ type: "set-patch", index: s })
  }

  const recallScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    dispatch({ type: "select-patch", index: s })
  }


  return (
    <>
    <div className="scene">
      <div className={className} onClick={onClick} aria-hidden="true" >
        <input type="range" step={1} min={0} max={max} value={state.params[code]} onChange={onChange} />
        <span>
          {state.params[code] + (state.learning ? ` - CC ${state.mapping[code]}`: '') }
        </span>
      </div>
      <CvInput code="x"/>
      <CvInput code="y"/>
      <CvInput code="z"/>
    </div>
    <div className="store-recall">
      <nav>
        <span> Store to:</span>
        {[0,1,2,3].map(i => <a href="/" className={Math.floor(state.params[code]/(1024/4)) === i ? 'active':'' } key={i} scene={i} onClick={storeScene}>{'ABCD'[i]}</a>)}
      </nav>
      <nav>
        <span> Recall from:</span>
        {[0,1,2,3].map(i => <a href="/" key={i} scene={i} onClick={recallScene}>{'ABCD'[i]}</a>)}
      </nav>
    </div>
    </>
  )
}


export default Scene
