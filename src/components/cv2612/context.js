import React from "react"
import {emptyParams, emptyMapping} from "./utils/patches-utils"
import Emulator from './utils/emulator'
import {reactLocalStorage} from 'reactjs-localstorage'

export const CV2612Context = React.createContext()
export const CV2612Consumer = CV2612Context.Consumer

const ctrlmap = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am','al','fb','ams','fms','st','lfo']

// Create the provider using a traditional React.Component class
class CV2612Provider extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      midi: null,
      emulator: new Emulator(),
      learning: false,
      activeParameter: null,
      envelopes: {},
      params: emptyParams(),
      mapping: emptyMapping(),
      filters:{ch: 6},
      soundOn: false,
      setActiveParameter: this.setActiveParameter,
      updateParam: this.updateParam,
      updateParams: this.updateParams,
      filterChannel: this.filterChannel,
      toggleSound: this.toggleSound,
      toggleLearning: this.toggleLearning,
      handleCC: this.handleCC,
    }
  }

  componentWillMount(){
    this.toggleSound()
    const mapping = reactLocalStorage.getObject('mapping',null)
    if(mapping!==null)
      this.setState({mapping:mapping})
  }

  componentWillUnmount() {
    this.state.emulator.destroy()
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
        const resolution = Math.pow(2,m.bits)
        const step = 128/resolution
        const v = Math.floor(val/step)
        this.updateParam(k,v)
      }
    }

  }

  toggleLearning = () =>{
    this.setState({learning: !this.state.learning})
  }


  toggleSound = () =>{
    if(this.state.soundOn){
      this.state.emulator.pause()
    }else{
      this.state.emulator.play()
    }
    this.setState({soundOn: !this.state.soundOn})
  }


  //todo: should be internal only
  sendParameter = (code, value) => {
    const parts = code.split('_')
    const ch = parseInt(parts[0])
    const op = parseInt(parts[1])
    const param = parts[2]
    // send data header
    const addr = []
    // part 6 is a three bytes address
    // 6 will be a omni or non channel message
    addr.push(ch)
    // 4 will be a omni or non operator message
    addr.push(op)
    // ctrl name  to 7-bit number
    addr.push(ctrlmap.indexOf(param))
    this.state.midi.sendSysexSet(addr,value)
    this.state.emulator.update(ch,op,param,value,this.state.params)
  }

  setActiveParameter = (param) => {
    this.setState({activeParameter: param})
  }


  updateParam = (code,value) => {
    let params = {...this.state.params}
    if(params[code] !== value){
      params[code] = value
      this.setState({params: params})
      this.sendParameter(code,value)
    }
  }

  updateParams = (params) => {
    this.setState({params: params})

    for (let [k, v] of Object.entries(params)) {
      this.sendParameter(k,v)
    }

  }

  filterChannel= (ch) => {
    let filters = {...this.state.filters}
    filters.ch = ch
    this.setState({filters})
  }



  componentDidUpdate(prevProps, prevState) {
    const p1 = prevState.params
    const p2 = this.state.params
    const env_params = ['ar','d1','sl','d2','rr','tl']

    //which params have changed?
    const diff = Object.keys(p2).reduce((diff, key) => {
      if (p1[key] === p2[key]) return diff
      return {
        ...diff,
        [key]: p2[key]
      }
    }, {})

    //check if any envelope should change
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
          .reduce((acc,i)=>{acc[`${i}`]=p2[`${e}_${i}`];return acc},{})
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

export default CV2612Provider
