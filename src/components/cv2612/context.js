import React from "react"
import {ctrlMap, globalParams, emptyParams, emptyMapping, bitness} from "./utils/patches-utils"
import obj_diff from "./utils/obj_diff"
import {reactLocalStorage} from 'reactjs-localstorage'

export const CV2612Context = React.createContext()
export const CV2612Consumer = CV2612Context.Consumer

// Create the provider using a traditional React.Component class
export class CV2612Provider extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      midi: null,
      emulator: null,
      learning: false,
      activeParameter: null,
      envelopes: {},
      mapping: emptyMapping(),
      params: emptyParams(),
      filters:{ch: 0},
      soundOn: false,
      setActiveParameter: this.setActiveParameter,
      updateParam: this.updateParam,
      sendVoice: this.sendVoice,
      loadPatch: this.loadPatch,
      filterChannel: this.filterChannel,
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
      if(mapping[k].ch !== ch && mapping[k].cc !== cc){
        mapping[k].ch = ch
        mapping[k].cc = cc
        this.setState({mapping: mapping})
        reactLocalStorage.setObject('mapping',mapping)
      }
    }

    for (let [k, m] of Object.entries(this.state.mapping)) {
      if(m.cc === cc && m.ch === ch){
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
      const pId = globalParams.indexOf(code)
      // 0x05 is a globalParam
      this.state.midi.sendSysexSet([0x05,pId,value])
    }else{
      const parts = code.split('_')
      const ch = parseInt(parts[0])
      const op = parseInt(parts[1])
      const param = parts[2]
      const pId = ctrlMap.indexOf(param)
      if(pId===-1){
        console.error(`Unexpected param ${param} in code ${code}`)
      }else{
         //todo: implement omni channel on chip side
         // and avoid resending parameters triggered by omni channel
        this.state.midi.sendSysexSet([ch,op,pId,value])
        this.state.emulator.update(ch,op,param,value)
      }
    }

  }

  sendVoice = (v) => {
    console.log(`sendVoice ${v}`)
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



  sendPatch = () => {
    console.log('sendPatch')
    this.state.emulator.loadCurrentPatch()
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

  loadPatch = (newParams) => {
    let params = {...this.state.params}
    for (let [code, value] of Object.entries(newParams)) {
      params[code] = value
    }
    this.setState({params: params})
    this.loadingPatch =  true
  }

  filterChannel= (ch) => {
    let filters = {...this.state.filters}
    filters.ch = ch
    this.setState({filters})
  }

  componentDidUpdate(prevProps, prevState) {
    //we only care if params have changed
    if(prevState.params===this.state.params)
      return

    if(this.loadingPatch){
      this.loadingPatch = false
      //send all params when loading a patch
      this.sendPatch()
      this.updateEnvelopesIfChanged(this.state.params)
    }else{
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
      if (env_params.some((a) => key.endsWith(a)))
        //accumulates channel_operator to identify envelope to update
        acc.push(key.substring(0,3))
      return acc
    }, [])
      .filter((x, i, a) => a.indexOf(x) === i) //filter unique

    //update envelopes?
    if(envs.length){
      let envelopes = {...this.state.envelopes}
      envs.forEach( (e) => {
        const env = env_params
          .reduce((acc,i)=>{acc[`${i}`]=this.state.params[`${e}_${i}`];return acc},{})
        // re-calculate changed envelope
        envelopes[e] = this.calculateEnvelopePoints(env)
      })
      this.setState({envelopes: envelopes})
    }
  }



  calculateEnvelopePoints(env){
    const x1 = Math.round((31-env.ar)/31*100)
    const y1 = Math.round(env.tl/127*100)
    const x2 = Math.round(x1+(31-env.d1)/31*100)
    const y2 = Math.round(y1+(100-y1)*(env.sl/15))
    const x3 = Math.round(x2+(31-env.d2)/31*50+50)
    const y3 = Math.round(y2+(100-y2)*(0.5*(env.d2/31)))
    const x4 = Math.round(x3+(31-env.rr)/31*100)

    const points = [
        [0,100],
        [x1,y1],
        [x2,y2],
        [x3,y3],
        [x4,100]
      ]
    return points.map((p)=>p.join(',')).join(' ').replace(/NaN/g,'0')
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
