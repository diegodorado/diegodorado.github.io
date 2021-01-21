import React, { useEffect, useReducer} from "react"
import {ctrlMap, globalParams, emptyParams, emptyMapping, bitness} from "./utils/patches-utils"
import {calculateEnvelopePoints} from "./utils/envelopePoints"
//import {reactLocalStorage} from 'reactjs-localstorage'
import MidiIO from './midi-io'
import PresetsIO from './presets-io'

const CV2612Context = React.createContext()

const initialState = {
  emulator: null,
  learning: false,
  activeParameter: null,
  envelopes: {},
  mapping: emptyMapping(),
  params: emptyParams(),
  presets: [],
  instruments: [],
  presetIdx : 0,
  patchIdx: 0,
  instrumentIdx : 0,
  soundOn: false,
}


const sendNRPN = (channel, patchIdx, code, value) => {
  const lsbOffset = patchIdx * 10
  if(globalParams.includes(code)){
    if(code === 'lfo' ){
      MidiIO.sendNRPN(channel,1, lsbOffset,value,0)
    }else if(code === 'pm' ){
      MidiIO.sendNRPN(channel,2, lsbOffset,value,0)
    }else if(code === 'vs' ){
      MidiIO.sendNRPN(channel,3, lsbOffset,value,0)
    }
  }else{
    const parts = code.split('_')
    const param = parts[0]
    const op = parseInt(parts[1])
    const pId = ctrlMap.indexOf(param)
    if(pId===-1){
      console.error(`Unexpected param ${param} in code: ${code}`)
    }else{
       const ccOff = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am'].indexOf(param)
      if(ccOff!==-1)
        MidiIO.sendNRPN(channel,30+ccOff,op+lsbOffset,value,0)
      const ccOff2 = ['al','fb','ams','fms','st'].indexOf(param)
      if(ccOff2!==-1)
        MidiIO.sendNRPN(channel,20+ccOff2,lsbOffset,value,0)
    }
  }
  //udpateEmulator(this.state.voice,code,value)
  //patch.voices[this.state.voice][code] = value
}




const updateParam = (state, code, value) =>{
  state.params[code] = value
  if(code==="bl"){
    return updateParams(state,false)
    //todo: send midi cc for bl
  }else{
    const preset = state.presets[state.presetIdx]
    const patch = preset.patches[state.patchIdx]
    const instrument = patch.instruments[state.instrumentIdx]
    const codes = Object.keys(instrument).filter(c => c !== "name")

    if(codes.includes(code)){
      instrument[code] = value
      sendNRPN(state.instrumentIdx + 1, state.patchIdx, code, value)
    }
    else if(code === "lfo"){
      patch[code] = value
      sendNRPN(0, state.patchIdx, code, value)
    }

    const env_params = ['ar','d1','sl','d2','rr','tl']
    const [param,op] = code.split('_')
    if(env_params.includes(param))
    //todo: update op envelope only
      return updateEnvelopes(state, op)
    else
      return state
  }

}


const updateParams = (state,sendMidi = true) =>{

  const lerp = (a,b,t) => a + t * (b - a)
  const codes = Object.keys(state.instruments[0]).filter(c => c !== "name")

  const preset = state.presets[state.presetIdx]
  const blend = Math.min(state.params["bl"]/42, 3)
  const lowIdx = Math.min(2,Math.floor(blend))
  state.patchIdx = Math.round(blend)
  const lPatch = preset.patches[lowIdx]
  const rPatch = preset.patches[lowIdx+1]

  //state.params['pm'] = preset['pm']

  const t = blend - lowIdx
  const lerpParam = (code,a,b) => {
    const val = Math.round(lerp(a[code],b[code],t))
    state.params[code] = val
  }

  lerpParam("lfo",lPatch,rPatch)
  for (let code of codes){
      lerpParam(code,lPatch.instruments[state.instrumentIdx],rPatch.instruments[state.instrumentIdx])
  }

  if(sendMidi){
    //todo: cache a sync status between device and webpage
    //have a first sync, and then update only changed params
    const patch = preset.patches[state.patchIdx]
    //should we send an NRPN update?
    for (let i=0;i<4;i++){
      sendNRPN(0,i, 'lfo',patch['lfo'])
      for (let j=0;j<6;j++){
        const instrument = patch.instruments[j]
        for (let code of codes){
          sendNRPN( j+1, i, code, instrument[code])
        }
      }
    }
  }

  // asumes envelopes have changed
  return updateEnvelopes(state)
}

const updateEnvelopes = (state) =>{
  let envelopes = {...state.envelopes}
  for(let i = 0; i<4 ; i++)
    envelopes[i] = calculateEnvelopePoints(state.params, i)
  return {...state, envelopes: envelopes}
}

const updateControlChange = (state,cc,val)=>{

  if(state.learning && state.activeParameter && (state.mapping[state.activeParameter]!== cc)){
    state.mapping[state.activeParameter] = cc
    //reactLocalStorage.setObject('mapping',state.mapping)
  }

  for (let [k, m] of Object.entries(state.mapping)) {
    if(m===cc){
      const bits = bitness(k)
      const resolution = Math.pow(2,bits)
      const step = 128/resolution
      const v = Math.floor(val/step)
      state =  updateParam(state,k, v)
    }
  }
  return state
}



//todo: loadParams when change preset, 
//todo: udpateParams without sending MIDI out
const reducer = (state, action) => {

  switch (action.type) {
    case "set-mapping":
      return { ...state, mapping: action.mapping}
    case "prev-preset":{
      const presetIdx = (state.presetIdx+state.presets.length-1) % state.presets.length
      //fixme: avoid mutations
      state.params["bl"] = 0
      return updateParams({ ...state, presetIdx,  patchIdx: 0, instrumentIdx: 0})
    }
    case "next-preset":{
      const presetIdx = (state.presetIdx+1) % state.presets.length
      //fixme: avoid mutations
      state.params["bl"] = 0
      return updateParams({ ...state, presetIdx,  patchIdx: 0, instrumentIdx: 0})
    }
    case "change-preset":
      //fixme: avoid mutations
      state.params["bl"] = 0
      return updateParams({ ...state, presetIdx: action.index,  patchIdx: 0, instrumentIdx: 0})
    case "update-param":
      return updateParam(state,action.code, action.value)
    case "active-param":
      return { ...state, activeParameter: action.code}
    case "toggle-learning":
      return { ...state, learning: !state.learning}
    case "provider-ready":
      const presets = action.presets
      const instruments = action.instruments
      return updateParams({ ...state, presets, instruments})
    case "change-patch":
      const patchIdx = action.index
      //fixme: avoid mutations
      state.params["bl"] = patchIdx * 42
      return updateParams({ ...state, patchIdx},false)
    case "change-instrument":
      const instrumentIdx = action.index
      return updateParams({ ...state, instrumentIdx},false)
    case "load-instrument":{
      //fixme: avoid mutations
      const patch = state.presets[state.presetIdx].patches[state.patchIdx]
      patch.instruments[state.instrumentIdx] = Object.assign({},state.instruments[action.index])
      return updateParams(state)
    }
    case "copy-from-patch":{
      const preset = state.presets[state.presetIdx]
      const patch = preset.patches[action.index]
      preset.patches[state.patchIdx] = Object.assign({},patch)
      return updateParams(state)
    }
    case "copy-all-patches":{
      const preset = state.presets[state.presetIdx]
      const patch = preset.patches[state.patchIdx]
      for(let i =0;i<4;i++)
        preset.patches[i] = Object.assign({},patch)
      return updateParams(state)
    }

    case "copy-from-instrument":{
      const patch = state.presets[state.presetIdx].patches[state.patchIdx]
      const instrument = patch.instruments[action.index]
      patch.instruments[state.instrumentIdx] = Object.assign({},instrument)
      return updateParams(state)
    }
    case "copy-all-instruments":{
      const patch = state.presets[state.presetIdx].patches[state.patchIdx]
      const instrument = patch.instruments[state.instrumentIdx]
      for(let i =0;i<6;i++)
        patch.instruments[i] = Object.assign({},instrument)
      return updateParams(state)
    }
    case "control-change":{
      const {cc,val} = action
      return updateControlChange({...state},cc,val)
    }
    case "set-patch":
      MidiIO.sendNRPN(0,64,0,action.index,0)
      return state
    case "select-patch":
      MidiIO.sendNRPN(0,64,1,action.index,0)
      return state
    default:
      throw new Error()
  }
}

const CV2612Provider = ({children}) =>{

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(()=>{

    (async () => {
       await MidiIO.init()
       const {presets,instruments} = await PresetsIO.load()
       dispatch({ type: "provider-ready", presets, instruments})
    })()

    MidiIO.sub('onControlChange', onControlChange)

    return () => {
      MidiIO.unsub('onControlChange', onControlChange)
    }

    //dispatch({ type: "set-mapping", mapping: reactLocalStorage.getObject('mapping',{})})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onControlChange = (data)=>{
    const cc = data[1] & 0x7f
    const val = data[2] & 0x7f
    dispatch({ type: "control-change", cc: cc, val: val})
  }

  return (
    <CV2612Context.Provider value={value}>
      {children}
    </CV2612Context.Provider>
  )
}

const CV2612Consumer = CV2612Context.Consumer

export { CV2612Context, CV2612Provider, CV2612Consumer }
