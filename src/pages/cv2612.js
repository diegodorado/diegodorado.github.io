import React, {useContext} from "react"
import Layout from "../layouts/cv2612"
import SEO from "../components/seo"
import Knob from "../components/knob"
import Slider from "../components/slider"
import Operator from "../components/cv2612/operator"
import {reactLocalStorage} from 'reactjs-localstorage'
import {CV2612Context} from "../components/cv2612/cv2612Context"

class CV2612Index extends React.Component {

  midiInId = ''
  midiOutId = ''


  constructor(props){
    super(props);

    this.state = {
      midiAccess: null,
      midiIns: [],
      midiOuts: [],
      lastMsg: '',
      mapping:{
        learning: false,
        activeControl: null,
        controls: []
      }
    }


  }

  onChangeMidiIn = (ev) => {
    this.setMidiIn(ev.target.value)
  }

  onChangeMidiOut = (ev) => {
    this.setMidiOut(ev.target.value)
  }

  setMidiOut(id){
    this.midiOutId = id
    this.setState({midiOutId: id})
    reactLocalStorage.set('midiOutId',id)
    this.sendHandshake()
  }

  setMidiIn(id){
    this.midiInId = id
    this.setState({midiInId: id})
    reactLocalStorage.set('midiInId',id)
    const midiIn = this.state.midiAccess.inputs.get(id)
    if(midiIn){
      midiIn.onmidimessage = this.onMIDIMessage
    }else{
      console.log('Midi In error')
    }
  }

  sendHandshake(){
    // device ID request
    const msg = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7]
    this.sendMidi(msg)

  }

  sendMidi(data){
    const midiOut = this.state.midiAccess.outputs.get(this.midiOutId)
    if(midiOut){
      midiOut.send(data)
    }else{
      console.log('No Midi Out')
    }
  }

  componentDidMount(){
    navigator.requestMIDIAccess( { sysex: true }).then(
      (ma)=>{
        this.setState({midiAccess: ma})
        this.refreshMidiPorts()
        ma.onstatechange = this.onMIDIStateChange
      },()=>console.log('Could not access your MIDI devices.'))
  }

  onMIDIStateChange = (e) => {
    // Print information about the (dis)connected MIDI controller
    console.log(e.port.name, e.port.manufacturer, e.port.state, e.port.type)
    this.refreshMidiPorts()
  }

  refreshMidiPorts() {
    const ma = this.state.midiAccess
    const inputs = Array.from(ma.inputs.values())
    const outputs = Array.from(ma.outputs.values())
    this.setState({midiIns:inputs, midiOuts:outputs})

    if(inputs.length){
      let id = reactLocalStorage.get('midiInId')
      // is last id still available??
      if( !inputs.map(i=>i.id).includes(id) ){
        id = inputs[0].id
      }
      if(id !== this.midiInId)
        this.setMidiIn(id)
    }
    if(outputs.length){
      let id = reactLocalStorage.get('midiOutId')
      // is last id still available??
      if( !outputs.map(o=>o.id).includes(id) ){
        id = outputs[0].id
      }
      if(id !== this.midiOutId)
        this.setMidiOut(id)
    }
  }

  onMIDIMessage = (msg) => {

    if(msg.target.id !== this.midiInId)
      return

    const data = Array.from(msg.data)
    const type = data[0] & 0xf0

    if(type===0xF0){ // sysex
      const idReply = [0xF0, 0x7E, 0x00, 0x06, 0x02,  //identity reply
          0x26, 0x26, 0x12, 0x00, 0x00, // ID - family code - model number
          0x01, 0x00, 0x00, 0x00, 0xF7] //version - end
      if(JSON.stringify(data) === JSON.stringify(idReply)){
        this.setState({lastMsg: `CV2612 found!` })
      }
      return
    }

    const ch = data[0] & 0x0f
    const cc = data[1] & 0x7f
    const val = data[2] & 0x7f
    if(type === 0xB0){
      if(this.state.mapping.learning){
        const ctrl = this.state.mapping.activeControl
        if(ctrl)
          ctrl.setMapping(cc,ch)
      }

      for(const k of this.state.mapping.controls){
        if(k.state.cc === cc && k.state.ch === ch){
          k.updateValue(val)
        }
      }

      this.setState({lastMsg: `${type},${ch},${cc},${val}` })
    }
  }

  onLearnClick = (e) => {
    e.preventDefault()
    let mapping = {...this.state.mapping}
    mapping.learning = !mapping.learning
    this.setState({mapping})
  }


  render() {
    return (
      <Layout location={this.props.location} >
        <CV2612Context.Provider value={this.state.mapping}>
          <SEO title="cv2612" />
          <div>
            <p>
              {this.state.learning ? (this.state.learnCC ? 'Now move a knob on this page':'Move a knob on your controller') : this.state.lastMsg ||'Click learn to bind a controller'}
            </p>
            <button onClick={this.onLearnClick}>{this.state.mapping.learning ? 'Done':'Learn'}</button>
            <select value={this.state.midiInId} onChange={this.onChangeMidiIn}>
              {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.manufacturer} - {i.name}</option>)}
            </select>
            <select value={this.state.midiOutId} onChange={this.onChangeMidiOut}>
              {this.state.midiOuts.map((o) =><option key={o.id} value={o.id}>{o.manufacturer} - {o.name}</option>)}
            </select>
          </div>
          <br/>
          <img alt="envelopes" src="/images/envspec.png"/>
          <br/><br/>
          <Operator />
        </CV2612Context.Provider>
      </Layout>
    )
  }
}

export default CV2612Index
