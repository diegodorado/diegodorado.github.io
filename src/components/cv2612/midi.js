import React from 'react'
import {CV2612Context} from "./context"
import {reactLocalStorage} from 'reactjs-localstorage'
import { FaSlidersH,
         FaTrash,
         FaGhost
        } from 'react-icons/fa'


//todo: move midi stuff to midi-utils.js
//warning: this component cannot be unmounted
class Midi extends React.Component {
  static contextType = CV2612Context

  midiCtrlInId = ''
  midiInId = ''
  midiOutId = ''
  midiAccess= null

  constructor(props) {
    super(props)
    this.state = {
      midiIns: [],
      midiOuts: [],
    }

  }

  componentDidMount(){
    navigator.requestMIDIAccess( { sysex: true }).then(
      (ma)=>{
        this.midiAccess = ma
        this.refreshMidiPorts()
        ma.onstatechange = this.onMIDIStateChange
      },()=>console.log('Could not access your MIDI devices.'))

    this.context.midi = this
  }


  onChangeMidiIn = (ev) => {
    this.setMidiIn(ev.target.value)
  }

  onChangeMidiCtrlIn = (ev) => {
    this.setMidiCtrlIn(ev.target.value)
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
    const midiIn = this.midiAccess.inputs.get(id)
    if(midiIn){
      midiIn.onmidimessage = this.onMIDIMessage
    }else{
      console.log('Midi In error')
    }
  }


  setMidiCtrlIn(id){
    this.midiCtrlInId = id
    this.setState({midiCtrlInId: id})
    reactLocalStorage.set('midiCtrlInId',id)
    const midiIn = this.midiAccess.inputs.get(id)
    if(midiIn){
      midiIn.onmidimessage = this.onCtrlMIDIMessage
    }else{
      console.log('Midi Ctrl In error')
    }
  }



  sendHandshake(){
    // device ID request
    const msg = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7]
    this.sendSysex(msg)

  }

  sysexCount = 0
  sendSysex = (data) => {
    this.sendMidi(data)
    this.sysexCount++
    console.log('sysexCount',this.sysexCount)
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
    const ma = this.midiAccess
    if(ma===null){
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
    this.refreshMidiPorts()
  }

  refreshMidiPorts() {
    const ma = this.midiAccess
    const inputs = Array.from(ma.inputs.values())
    const outputs = Array.from(ma.outputs.values())

    this.setState({midiIns:inputs, midiOuts:outputs})

    if(inputs.length){
      let id = reactLocalStorage.get('midiInId','')
      // is last id still available??
      if( id!=='' && !inputs.map(i=>i.id).includes(id) ){
        id = inputs[0].id
      }
      if(id !== this.midiInId)
        this.setMidiIn(id)

      id = reactLocalStorage.get('midiCtrlInId','')
      // is last id still available??
      if( id!=='' && !inputs.map(i=>i.id).includes(id) ){
        id = inputs[0].id
      }
      if(id !== this.midiCtrlInId)
        this.setMidiCtrlIn(id)

    }
    if(outputs.length){
      let id = reactLocalStorage.get('midiOutId','')
      // is last id still available??
      if( id!=='' &&  !outputs.map(o=>o.id).includes(id) ){
        id = outputs[0].id
      }
      if(id !== this.midiOutId)
        this.setMidiOut(id)
    }
  }



  onCtrlMIDIMessage = (msg) => {
    //warning: filter loopback messages somehow

    if(msg.target.id !== this.midiCtrlInId)
      return

    const data = Array.from(msg.data)
    const type = data[0] & 0xf0

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
        console.log(`CV2612 found!`)
      }else{
        //console.log('sysex reply ')
        //console.log(data)
      }
      return
    }

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
    this.sendSysexSet([0x06,0x04,0x11],0x00)
  }

  onToggleSoundClick = (e) => {
    e.preventDefault()
    this.context.toggleSound()
  }

  render() {
    return (
      <nav className="midi">
        <span>Ctrl</span>
        <select value={this.state.midiCtrlInId} onChange={this.onChangeMidiCtrlIn}>
          <option key="" value="">Not Connected</option>
          {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
        <span>In</span>
        <select value={this.state.midiInId} onChange={this.onChangeMidiIn}>
          <option key="" value="">Not Connected</option>
          {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
        <span>Out</span>
        <select value={this.state.midiOutId} onChange={this.onChangeMidiOut}>
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
