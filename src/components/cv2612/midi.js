import React from 'react'
import {CV2612Context} from "./context"
import {reactLocalStorage} from 'reactjs-localstorage'
import { FaSlidersH,
         FaTrash,
         FaGhost
        } from 'react-icons/fa'
import MidiIO from './midi-io'


//warning: this component cannot be unmounted
class Midi extends React.Component {
  static contextType = CV2612Context

  constructor(props) {
    super(props)

    this.state = {
      midiIns: [],
      midiOuts: [],
      connected: false
    }
  }

  componentDidMount(){
    this.io = new MidiIO(this)
    this.context.midi = this
  }

  onStateChange(inputs,outputs){
    const s = {midiIns:inputs, midiOuts:outputs, connected: false}

    const refresh = (key,array) =>{
      let id = reactLocalStorage.get(key,'')
      // is last id still available??
      if( id!=='' && !array.map(a=>a.id).includes(id) ){
        id = inputs[0].id
      }
      if(id !== this.state[key])
        s[key] = id
    }

    if(inputs.length){
      refresh('midiInId',inputs)
      refresh('midiCtrlInId',inputs)
    }
    if(outputs.length){
      refresh('midiOutId',outputs)
    }


    this.setState(s)

  }

  onLoopBack(){
    this.setMidiOut('')
    console.error('Loopback prevented')
  }


  onNoteOn(pitch, velocity){
    this.context.emulator.noteOn(pitch)
  }

  onNoteOff(pitch, velocity){
    this.context.emulator.noteOff(pitch)
  }

  onControlChange(ch,cc, val){
    this.context.handleCC(ch,cc, val)
  }



  onChangeMidiIn = (ev) => {
    this.setState({midiInId: ev.target.value})
  }

  onChangeMidiCtrlIn = (ev) => {
    this.setState({midiCtrlInId: ev.target.value})
  }

  onChangeMidiOut = (ev) => {
    this.setState({midiOutId: ev.target.value})
  }


  //todo: refactor this shitty code
  componentDidUpdate(prevProps, prevState) {
    let handshake = false;

    (['midiCtrlInId','midiInId','midiOutId']).forEach((m)=>{
      if(prevState[m] !== this.state[m]){
        reactLocalStorage.set(m,this.state[m])
        //disconnect inmediatelly
        this.setState({connected:false})
        handshake = true
      }
    })

    if(handshake){

      (async () => {
        try {
          await this.io.sendHandshake()
          this.setState({connected:true})
        } catch(err) {
          console.error(err)
          this.setState({connected:false})
        }
      })();


      /*

      (async () => {

        try {
          let data = await this.io.sendHandshake2()
          console.log(data)
          data = await this.io.sendHandshake2()
          console.log(data)
          data = await this.io.sendHandshake2()
          console.log(data)
          data = await this.io.sendHandshake2()
          console.log(data)
          data = await this.io.sendHandshake2()
          console.log(data)
        } catch(err) {
          console.error(err)
        }

      })();


        */



    }
  }

  sendMidi = (data) => {
    this.io.sendMidi(data)
  }

  sendCC = (ch,n,v) => {
    const data = [0xb0|ch,0x7f&n,0x7f&v]
    console.log(data)
    this.io.sendMidi(data)
  }


  onLearnClick = (e) => {
    e.preventDefault()
    this.context.toggleLearning()
  }

  onPanicClick = (e) => {
    e.preventDefault()
    this.sendMidi([0xFF])
  }

  onClearClick = (e) => {
    e.preventDefault()
    this.sendSysexSet([0x06,0x04,0x11,0x00])
  }

  onToggleSoundClick = (e) => {
    e.preventDefault()
    this.context.toggleSound()
  }

  render() {
    return (
      <nav className={`midi ${this.state.connected ? 'connected' :''}`}>
        <span>Ctrl</span>
        <select className="ctrl" value={this.state.midiCtrlInId} onChange={this.onChangeMidiCtrlIn}>
          <option key="" value="">Not Connected</option>
          {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
        <span>In</span>
        <select className="in" value={this.state.midiInId} onChange={this.onChangeMidiIn}>
          <option key="" value="">Not Connected</option>
          {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
        <span>Out</span>
        <select className="out" value={this.state.midiOutId} onChange={this.onChangeMidiOut}>
          <option key="" value="">Not Connected</option>
          {this.state.midiOuts.map((o) =><option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
        <a className={this.context.learning ? 'learning':''} href="/" title="Click to Learn" onClick={this.onLearnClick}><FaSlidersH/></a>
        <a href="/" title="Click if panic" onClick={this.onPanicClick}><FaGhost/></a>
        <a href="/" title="Click to clear midi mapping" onClick={this.onClearClick}><FaTrash/></a>
      </nav>
    )
  }
}

export default Midi;
