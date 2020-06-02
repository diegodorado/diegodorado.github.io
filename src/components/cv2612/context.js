import React, { useEffect, useReducer} from "react"
import {ctrlMap, globalParams, emptyParams, emptyMapping, bitness} from "./utils/patches-utils"
import {calculateEnvelopePoints} from "./utils/envelopePoints"
import {reactLocalStorage} from 'reactjs-localstorage'
import MidiIO from './midi-io'
import PatchesIO from './patches-io'

const CV2612Context = React.createContext()

const initialState = {
  emulator: null,
  learning: false,
  activeParameter: null,
  envelopes: {},
  mapping: emptyMapping(),
  params: emptyParams(),
  patches: [],
  patchIndex : 0,
  voiceIndex : 0,
  soundOn: false,
}


const sendNRPN = (channel, code, value) => {
  // console.log(channel, code, value)
  if(globalParams.includes(code)){
    if(code === 'lfo' ){
      MidiIO.sendNRPN(channel,1,0,value,0)
    }else if(code === 'play-mode' ){
      MidiIO.sendNRPN(channel,2,0,value,0)
    }else if(code === 'vel-sensitivity' ){
      MidiIO.sendNRPN(channel,3,0,value,0)
    }
  }else{
    const parts = code.split('_')
    const param = parts[0]
    const op = parseInt(parts[1])
    const pId = ctrlMap.indexOf(param)
    if(pId===-1){
      console.error(`Unexpected param ${param} in code ${code}`)
    }else{
      const ccOff = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am'].indexOf(param)
      if(ccOff!==-1)
        MidiIO.sendNRPN(channel,30+ccOff,op,value,0)
      const ccOff2 = ['al','fb','ams','fms','st'].indexOf(param)
      if(ccOff2!==-1)
        MidiIO.sendNRPN(channel,20+ccOff2,0,value,0)
    }
  }
  //udpateEmulator(this.state.voice,code,value)
  //patch.voices[this.state.voice][code] = value

}




const updateParam = (state, code, value) =>{
  const paramChannel = () =>{
    if(globalParams.includes(code))
      return 0
    else
      return state.params['single-voice'] ? 0 : state.voiceIndex + 1
  }
  state.params[code] = value
  sendNRPN(paramChannel(), code, value)
  const env_params = ['ar','d1','sl','d2','rr','tl']
  const [param,op] = code.split('_')
  if(env_params.includes(param))
  //todo: update op envelope only
    return updateEnvelopes(state, op)
  else
    return state
}


const updateParams = (state) =>{
  const patch = state.patches[state.patchIndex]
  state.params['lfo'] = patch['lfo']
  state.params['play-mode'] = patch['play-mode']
  state.params['single-voice'] = patch['single-voice']

  sendNRPN(0,'lfo',patch['lfo'])
  sendNRPN(0,'play-mode',patch['play-mode'])

  for (let i=0;i<6;i++){
    const voice = patch.voices[i]
    for (let [code, value] of Object.entries(voice)){
      if(patch['single-voice']){
        if(i===0)
          sendNRPN(0,code,value)
      }
      else
        sendNRPN(i+1,code,value)

      if(i===state.voiceIndex)
        state.params[code] = value
    }
  }

  return updateEnvelopes(state,state.params)
}




const updateVoice = (state, voiceIndex) =>{
  const patch = state.patches[state.patchIndex]
  const voice = patch.voices[state.voiceIndex]

  for (let code of Object.keys(voice)){
    voice[code] = state.params[code]
    state.params[code] = patch.voices[voiceIndex][code]
  }
  state.voiceIndex = voiceIndex
  return updateEnvelopes(state,state.params)
}

const updateEnvelopes = (state) =>{
  let envelopes = {...state.envelopes}
  for(let i = 0; i<4 ; i++)
    envelopes[i] = calculateEnvelopePoints(state.params, i)
  return {...state, envelopes: envelopes}
}



const updateControlChange = (state,action)=>{
  //const ch = data[0] & 0x0f
  const {cc,val} = action

  if(state.learning && state.activeParameter && (state.mapping[state.activeParameter]!== cc)){
    state.mapping[state.activeParameter] = cc
    reactLocalStorage.setObject('mapping',state.mapping)
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




const reducer = (state, action) => {

  switch (action.type) {
    case "set-mapping":
      return { ...state, mapping: action.mapping}
    case "prev-patch":
      const index = (state.patchIndex+state.patches.length-1) % state.patches.length
      return updateParams({ ...state, patchIndex: index, voiceIndex: 0})
    case "next-patch":
      const index2 = (state.patchIndex+1) % state.patches.length
      return updateParams({ ...state, patchIndex: index2, voiceIndex: 0})
    case "change-patch":
      return updateParams({ ...state, patchIndex: action.patchIndex, voiceIndex: 0})
    case "update-param":
      return updateParam(state,action.code, action.value)
    case "active-param":
      return { ...state, activeParameter: action.code}
    case "toggle-learning":
      return { ...state, learning: !state.learning}
    case "provider-ready":
      return updateParams({ ...state, patches: action.patches})
    case "change-voice":
      return updateVoice(state, action.voiceIndex)
      //return updateParams({ ...state, voiceIndex: action.voiceIndex})
    case "control-change":
      return updateControlChange(state,action)
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
       let p = await PatchesIO.init()
       dispatch({ type: "provider-ready", patches: p})
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
