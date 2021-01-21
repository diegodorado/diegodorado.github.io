/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useContext} from "react"
import {CV2612Context} from "./context"
import InstrumentControls from "./instrument-controls"
import Slider from "./slider"
import CvInput from "./cv_input"

const Scene = (props) =>{
  const { state, dispatch } = useContext(CV2612Context)

  /*
  const storeScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    //dispatch({ type: "update-param", code: code, value: s*256+127 })
    dispatch({ type: "set-patch", index: s })
  }

  const recallScene = (ev) =>{
    ev.preventDefault()
    const s = parseInt(ev.target.attributes.scene.value, 10)
    dispatch({ type: "select-patch", index: s })
  }
  */

  const onLoadInstrument = ev => {
    ev.preventDefault()
    const index = parseInt(ev.target.value, 10)
    dispatch({ type: "load-instrument", index})
    ev.target.value = -1
  }

  const onCopyInstrument = ev => {
    ev.preventDefault()
    const index = parseInt(ev.target.value, 10)
    dispatch({ type: "copy-from-instrument", index})
    ev.target.value = -1
  }

  const onCopyPatch = ev => {
    ev.preventDefault()
    const index = parseInt(ev.target.value, 10)
    dispatch({ type: "copy-from-patch", index})
    ev.target.value = -1
  }



  const onChangeInstrument = index => ev => {
    ev.preventDefault()
    dispatch({ type: "change-instrument", index})
  }


  const onChangePatch = index => ev => {
    ev.preventDefault()
    dispatch({ type: "change-patch", index})
  }


  const onCopyToAllInstruments = ev => {
    ev.preventDefault()
    dispatch({ type: "copy-all-instruments"})
  }

  const onCopyToAllPatches = ev => {
    ev.preventDefault()
    dispatch({ type: "copy-all-patches"})
  }


  // 0:A , 21:A/B, 42:B, 63:B/C, 84:C, 105:C/D, 126/7:D
  const blend = Math.min(state.params["bl"]/42, 3)

  return (
      <>
       <div className="four-cols">
          <div className="col">
          </div>
          <div className="col">
            <CvInput code="x"/>
          </div>
          <div className="col">
            <CvInput code="y"/>
          </div>
          <div className="col">
            <CvInput code="z"/>
          </div>
        </div>       

        <div className="four-cols">
          <div className="col">
            <Slider name="bl"/>
          </div>
          <div className="col">
            <Slider name="pm" />
          </div>
          <div className="col">
            <Slider name="vs" />
          </div>
          <div className="col">
            <Slider name="li"/>
          </div>
        </div>

        <nav className="patches">
          <span>PATCH </span>
          {[0,1,2,3].map(i => <a href="/" style={{"--left":`${(blend-i)*100}%`}} className={state.patchIdx === i ? 'active':'' } key={i} onClick={onChangePatch(i)}>{'ABCD'[i]}</a>)}
        </nav>

        <nav className="clone">
          <select onBlur={onCopyPatch} >
            <option value={-1}> {'--> Copy from <--'} </ option>
            {[0,1,2,3].filter(i=>i!==state.patchIdx).map(i =><option key={i} value={i}>{'ABCD'[i]}</option>)}
          </select>
          <a href="/" onClick={onCopyToAllPatches} title={`Copy to all` }>Copy to All</a>
        </nav>


        <div className="four-cols">
          <div className="col">
            <Slider name="lfo"/>
          </div>
        </div>

        <nav>
          <span>INST </span>
          {[0,1,2,3,4,5].map(i => <a href="/" className={state.instrumentIdx === i ? 'active':'' } key={i} onClick={onChangeInstrument(i)} title={`View ${i+1}` }>{`${i+1}` }</a>)}
        </nav>

        <nav className="clone">
          <select onBlur={onLoadInstrument} >
            <option value={-1}> {'--> Load from <--'} </ option>
            {state.instruments.map((p,i) =><option key={i} value={i}>{p.name}</option>)}
          </select>
          <select onBlur={onCopyInstrument} >
            <option value={-1}> {'--> Copy from <--'} </ option>
            {[0,1,2,3,4,5].filter(i=>i!==state.instrumentIdx).map(i =><option key={i} value={i}>{i+1}</option>)}
          </select>
          <a href="/" onClick={onCopyToAllInstruments} title={`Copy to all` }>Copy to All</a>
        </nav>

        <br/>
        <br/>

        <InstrumentControls al={state.params['al']} />
      </>
  )


}

export default Scene
