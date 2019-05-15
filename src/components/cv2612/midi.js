import React from 'react'
import {CV2612Context} from "./context"
import {emptyMapping} from "./utils/patches-utils"
import {reactLocalStorage} from 'reactjs-localstorage'
import { FaSlidersH,
         FaTrash,
         FaGhost,
         FaVolume,
         FaVolumeSlash
        } from 'react-icons/fa'


//todo: move midi stuff to midi-utils.js
//warning: this component cannot be unmounted
class Midi extends React.Component {
  static contextType = CV2612Context

  midiInId = ''
  midiOutId = ''

  constructor(props) {
    super(props)
    this.state = {
      midiAccess: null,
      midiIns: [],
      midiOuts: [],
      lastMsg: '',
    }

  }

  componentDidMount(){
    navigator.requestMIDIAccess( { sysex: true }).then(
      (ma)=>{
        this.setState({midiAccess: ma})
        this.refreshMidiPorts()
        ma.onstatechange = this.onMIDIStateChange
      },()=>console.log('Could not access your MIDI devices.'))

    this.context.midi = this
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
    this.sendSysex(msg)

  }

  sendSysex = (data) => {
    this.sendMidi(data)
  }

  sendSysexSet = (addr,value) => {
    // send data header
    const msg = [0xF0, 0x41, 0x26, 0x12, 0x12]
    // part 6 is a three bytes address
    // part 7 is the data itself, in this case, a single 7-bit
    // part 8 is the cheksum , 0x7F - the sum of address and value
    const chksum = 0x7F - ((addr[0]+addr[1]+addr[2]+value)%0x7F)
    msg.push(addr[0])
    msg.push(addr[1])
    msg.push(addr[2])
    msg.push(value)
    msg.push(chksum)
    // part 9  is the end byte
    msg.push(0xF7)
    this.sendSysex(msg)
  }

  sendMidi = (data) => {
    const ma = this.state.midiAccess
    if(ma===null){
      console.log('Null midi Access')
      return
    }
    const midiOut = ma.outputs.get(this.midiOutId)
    if(midiOut){
      midiOut.send(data)
    }else{
      console.log('No Midi Out')
    }
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

    if(type === 0xB0){
      const ch = data[0] & 0x0f
      const cc = data[1] & 0x7f
      const val = data[2] & 0x7f
      this.context.handleCC(ch,cc, val)
      this.setState({lastMsg: `${type},${ch},${cc},${val}` })
    }

    // resend noteon/off events
    if(type === 0x80 || type === 0x90){
      this.sendMidi(data)
      if(type === 0x90){
        this.context.emulator.noteOn(data[1])
      }else{
        this.context.emulator.noteOff(data[1])
      }
    }

  }

  onLearnClick = (e) => {
    e.preventDefault()
    this.context.toggleLearning()
  }

  onPanicClick = (e) => {
    e.preventDefault()
    this.context.midi.sendSysexSet([0x06,0x04,0x10],0x00)
  }

  onClearClick = (e) => {
    e.preventDefault()
    this.context.midi.sendSysexSet([0x06,0x04,0x11],0x00)
  }

  //the navigation here came handy...
  onToggleSoundClick = (e) => {
    e.preventDefault()
    this.context.toggleSound()
  }

  render() {
    return (
      <div>
        <p>
          {this.state.lastMsg ||'Click learn to bind a controller'}
        </p>
        <nav className="midi">
          <span>In</span>
          <select value={this.state.midiInId} onChange={this.onChangeMidiIn}>
            {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
          <span>Out</span>
          <select value={this.state.midiOutId} onChange={this.onChangeMidiOut}>
            {this.state.midiOuts.map((o) =><option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
          <a className={this.context.learning ? 'learning':''} href="/" title="Click to Learn" onClick={this.onLearnClick}><FaSlidersH/></a>
          <a href="/" title="Click if panic" onClick={this.onPanicClick}><FaGhost/></a>
          <a href="/" title="Click to clear midi mapping" onClick={this.onClearClick}><FaTrash/></a>
          <a href="/" title="Toggles Sound" onClick={this.onToggleSoundClick}>{this.context.soundOn ?<FaVolume/>:<FaVolumeSlash/>}</a>
        </nav>
      </div>
    )
  }
}

export default Midi;
