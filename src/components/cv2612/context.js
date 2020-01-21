import React from "react"
import {ctrlMap, globalParams, emptyPatch, emptyParams, emptyMapping, bitness} from "./utils/patches-utils"
import {calculateEnvelopePoints} from "./utils/envelopePoints"
import obj_diff from "./utils/obj_diff"
import {reactLocalStorage} from 'reactjs-localstorage'

export const CV2612Context = React.createContext()
export const CV2612Consumer = CV2612Context.Consumer

// Create the provider using a traditional React.Component class
export class CV2612Provider extends React.Component {

  constructor(props){
    super(props);

    //no render tied, so keep away from state
    this.patch = emptyPatch()

    this.state = {
      midi: null,
      emulator: null,
      learning: false,
      activeParameter: null,
      envelopes: {},
      mapping: emptyMapping(),
      params: emptyParams(),
      voice: 0,
      soundOn: false,
      setActiveParameter: this.setActiveParameter,
      updateParam: this.updateParam,
      sendVoice: this.sendVoice,
      loadPatch: this.loadPatch,
      selectVoice: this.selectVoice,
      toggleLearning: this.toggleLearning,
      handleCC: this.handleCC,
    }
  }

  componentDidMount(){
    const savedMapping = {} // reactLocalStorage.getObject('mapping',{})
    if(Object.keys(savedMapping).length>0){
      let mapping = {...this.state.mapping}
      for (let [code, value] of Object.entries(savedMapping)) {
        mapping[code] = value
      }
      this.setState({mapping:mapping})
    }
  }

  handleCC = (ch,cc, val)=>{
    const k = this.state.activeParameter
    if(this.state.mapping[k] && this.state.learning){
      let mapping = {...this.state.mapping}
      if(mapping[k] !== cc){
        mapping[k] = cc
        this.setState({mapping: mapping})
        reactLocalStorage.setObject('mapping',mapping)
      }
    }

    for (let [k, m] of Object.entries(this.state.mapping)) {
      if(m === cc){
        const bits = bitness(k)
        const resolution = Math.pow(2,bits)
        const step = 128/resolution
        const v = Math.floor(val/step)
        this.updateParam(k,v)
      }
    }

  }

  toggleLearning = () =>{
    this.setState({learning: !this.state.learning})
  }

  sendParameter = (code, value) => {
    if(globalParams.includes(code)){
      //const pId = globalParams.indexOf(code)
      // 0x05 is a globalParam
      //this.state.midi.sendSysexSet([0x05,pId,value])
      //updates current patch
      this.patch[code] = value

      if(code === 'lfo' ){
        this.state.midi.sendCC(0,1,(value+1)*16-1)
      }else if(code === 'play-mode' ){
        this.state.midi.sendCC(0,2,value)
      }else if(code === 'vel-sensitivity' ){
        this.state.midi.sendCC(0,3,value)
      }


    }else{
      const parts = code.split('_')
      const param = parts[0]
      const op = parseInt(parts[1])
      const pId = ctrlMap.indexOf(param)
      if(pId===-1){
        console.error(`Unexpected param ${param} in code ${code}`)
      }else{
         //todo: implement omni channel on chip side
         // and avoid resending parameters triggered by omni channel
        // this.state.midi.sendSysexSet([this.state.voice,op,pId,value])

        const ccMap = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am']
        const ccOff = ccMap.indexOf(param)
        if(ccOff!==-1){
          const bits = bitness(param)
          const resolution = Math.pow(2,bits)
          const step = 128/resolution
          const v = (value+1)*step-1
          for(let i=0;i<6;i++)
            this.state.midi.sendCC(i,20+op*10+ccOff,v)
        }

        const ccMap2 = ['al','fb','ams','fms','st','lfo']
        const ccOff2 = ccMap2.indexOf(param)
        if(ccOff2!==-1){
          const bits = bitness(param)
          const resolution = Math.pow(2,bits)
          const step = 128/resolution
          const v = (value+1)*step-1
          for(let i=0;i<6;i++)
            this.state.midi.sendCC(i,10+ccOff2,v)
        }


        this.udpateEmulator(this.state.voice,code,value)
        //updates current patch
        this.patch.voices[this.state.voice][code] = value
      }
    }

  }

  sendVoice = (v) => {
    //filter out omni channel
    const keys = Object.keys(this.state.params)
      .filter( k => k.startsWith(`${v}_`))
      .sort()
    //[[am,ar,d1,d2,det,mul,rr,rs,sl,tl]*4 ,al,ams,fb,fms,st]
    //[10*4+5] = 45
    const data = keys.map( k => this.state.params[k])
    data.unshift(v)
    data.unshift(0x04)
    this.state.midi.sendSysexSet(data)
  }


  udpateEmulator = (v,code,value) => {
    if(this.state.emulator)
      this.state.emulator.update(v,code,value)
  }


  sendPatch = () => {

    for (let v=0;v<6;v++) {
      for (let [code, value] of Object.entries(this.patch.voices[v])) {
        this.udpateEmulator(v,code,value)
      }
    }
    //lfo
    this.udpateEmulator(null,'lfo',this.patch['lfo'])
    //this.sendVoice(0)
  }

  setActiveParameter = (param) => {
    this.setState({activeParameter: param})
  }

  updateParam = (code, value) => {
    let params = {...this.state.params}
    params[code] = value
    this.setState({params: params})
  }

  loadPatch = (patch) => {
    this.patch = patch
    this.updateParamsFromVoice(patch.voices[this.state.voice])
    this.loadingPatch =  true
  }

  selectVoice= (v) => {
    this.updateParamsFromVoice(this.patch.voices[v])
    this.setState({voice: v})
    this.loadingVoice =  true
  }

  updateParamsFromVoice = (voice) => {
    let params = {...this.state.params}
    //todo: update LFO
    for (let [code, value] of Object.entries(voice)) {
      params[code] = value
    }
    this.setState({params: params})
  }

  //todo: refactor this shitty code
  componentDidUpdate(prevProps, prevState) {

    if(this.loadingPatch){
      this.loadingPatch = false
      //send all params when loading a patch
      this.sendPatch()
      this.updateEnvelopesIfChanged(this.state.params)
    }else if(this.loadingVoice){
      this.loadingVoice = false
      this.updateEnvelopesIfChanged(this.state.params)
    }else{

      //we only care if params have changed
      if(prevState.params===this.state.params)
        return

      //send only differences
      const diff = obj_diff(prevState.params, this.state.params)
      const entries = Object.entries(diff)
      if(entries.length>0){
        for (let [code, value] of entries) {
          this.sendParameter(code,value)
        }
        this.updateEnvelopesIfChanged(diff)
      }
    }
  }

  updateEnvelopesIfChanged(diff){
    //check if any envelope should change
    const env_params = ['ar','d1','sl','d2','rr','tl']
    const envs = Object.keys(diff).reduce((acc, key) => {
      if (env_params.some((a) => key.startsWith(a)))
        //accumulates channel_operator to identify envelope to update
        acc.push(key.split('').reverse()[0])
      return acc
    }, [])
      .filter((x, i, a) => a.indexOf(x) === i) //filter unique

    //update envelopes?
    if(envs.length){
      let envelopes = {...this.state.envelopes}
      envs.forEach( (e) => {
        const env = env_params
          .reduce((acc,i)=>{acc[`${i}`]=this.state.params[`${i}_${e}`];return acc},{})
        // re-calculate changed envelope
        envelopes[e] = calculateEnvelopePoints(env)
      })
      this.setState({envelopes: envelopes})
    }
  }

  render () {
    return (
      // value prop is where we define what values
      // that are accessible to consumer components
       <CV2612Context.Provider value={this.state}>
        {this.props.children}
      </CV2612Context.Provider>
    )
  }
}
