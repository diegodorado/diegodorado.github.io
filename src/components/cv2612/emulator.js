import React from 'react'
import {CV2612Context} from "./context"
import AudioKeys from 'audiokeys'
import { FaVolume,
         FaVolumeSlash
        } from 'react-icons/fa'

//todo: update for all 6 channels
//todo: unload properly

const kb = new AudioKeys({polyphony: 1,rows: 1,priority: 'last'})


class Emulator extends React.Component {
  static contextType = CV2612Context
  audioCtx = null

  constructor(props) {
    super(props)
    this.state = {soundOn: false}
  }

  componentDidMount(){
    this.notes = []
    this.context.emulator = this
    kb.down(this.onKeyDown)
    kb.up(this.onKeyUp)
  }


  componentWillUnmount(){
    if(this.audioCtx!==null){
      this.audioCtx = null
    }
    kb._listeners.down = []
    kb._listeners.up = []
    console.log(kb._listeners)
  }



  initialize(){

    this.audioCtx = new AudioContext()

    this.audioCtx.audioWorklet.addModule('/cv2612/ym2612-processor.js').then(() => {
      this.ym2612Node = new AudioWorkletNode(this.audioCtx, 'ym2612-generator', { outputChannelCount: [2] })
      this.ym2612Node.port.onmessage = (event) => {console.log(event.data)}
      this.ym2612Node.connect(this.audioCtx.destination)

      this.write(0x27,0x00) //chan3 normal mode
      this.write(0x28,0x00)
      // load all patch params
      this.context.sendParameters(this.context.params)
    })
  }


  noteOn = (note) => {
    const f = ( Math.pow(2, ( note-69 ) / 12) ) * 440.0
    this.onKeyDown({note:note,frequency:f})
  }

  noteOff = (note) => {
    this.onKeyUp({note:note})
  }

  onKeyDown = (note) => {
    this.context.midi.sendMidi([0x90,note.note,0x70])

    if(!this.ym2612Node)
      return


    if(this.notes.indexOf(note.note)===-1)
      this.notes.push(note.note)

    this.setFrequency(note.frequency)

    if(this.notes.length===1){
      this.keyOn()
    }
  }

  onKeyUp = (note) => {
    this.context.midi.sendMidi([0x80,note.note,0x00])

    if(!this.ym2612Node)
      return


    for( let i = 0; i < this.notes.length; i++){
       if ( this.notes[i] === note.note)
         this.notes.splice(i, 1)
    }

    if(this.notes.length===0){
      this.keyOff()
    }
  }

  setFrequency(f) {
    let block = 2
    while (f >= 2048) {
      f /= 2
      block++
    }
    const freq = parseInt(f)

    for(let chan=0;chan<6;chan++){
      const ch_off = (Math.floor(chan/3) * 0x100 + chan%3 )
      this.write(0xA4+ch_off, ((freq >> 8) & 0x07) | ( ( block & 0x07 ) << 3))
      this.write(0xA0+ch_off, freq&0xFF)
    }
  }


  keyOn() {
    for(let chan=0;chan<6;chan++)
      this.write(0x28, 0xF0 + (Math.floor(chan/3) * 4 + chan%3 ) )
  }

  keyOff() {
    for(let chan=0;chan<6;chan++)
      this.write(0x28, 0x00 + (Math.floor(chan/3) * 4 + chan%3 ) )
  }


  write(address,value){
    if(!this.ym2612Node)
      return

    console.log(address.toString(16),value.toString(16))
    this.ym2612Node.port.postMessage([address,value])
  }


  update = (ch,op,param,value,params) =>{

    if(ch===6){
      for(let chan=0;chan<6;chan++)
        this.update(chan,op,param,value,params)
      return
    }

    const ch_off = (Math.floor(ch/3) * 0x100 + ch%3 )
    const mask = (key,size,shift) =>{
      return (params[`${ch}_${op}_${key}`] & (Math.pow(2,size)-1))<<shift
    }

    if(param==='lfo' ){
      //todo: disable lfo when value is 0?
      this.write(0x22, (0x01<<3) | (value & 0x07));
    }
    else if(param==='det' || param==='mul' ){
      const v = mask('det',3,4)|mask('mul',4,0)
      this.write(0x30+4*op+ch_off, v)
    }
    else if(param==='tl'){
      const v = mask('tl',7,0)
      this.write(0x40+4*op+ch_off, v)
    }
    else if(param==='rs' || param==='ar' ){
      const v = mask('rs',2,6)|mask('ar',5,0)
      this.write(0x50+4*op+ch_off, v)
    }
    else if(param==='am' || param==='d1' ){
      const v = mask('am',1,7)|mask('d1',5,0)
      this.write(0x60+4*op+ch_off, v)
    }
    else if(param==='d2' ){
      const v = mask('d2',5,0)
      this.write(0x70+4*op+ch_off, v)
    }
    else if(param==='sl' || param==='rr' ){
      const v = mask('sl',4,4)|mask('rr',4,0)
      this.write(0x80+4*op+ch_off, v)
    }
    else if(param==='al' || param==='fb' ){
      const v = mask('fb',3,3)|mask('al',3,0)
      this.write(0xB0+ch_off, v)
    }
    else if(param==='st' || param==='ams'|| param==='fms' ){
      const v = mask('st',2,6)|mask('ams',2,4)|mask('fms',3,0)
      this.write(0xB4+ch_off, v)
    }
  }

  onToggleSoundClick = (e) => {
    e.preventDefault()
    if(this.state.soundOn){
      this.ym2612Node.disconnect(this.audioCtx.destination)
    }else{
      if (this.audioCtx===null)
        this.initialize()
      else
        this.ym2612Node.connect(this.audioCtx.destination)
    }
    this.setState({soundOn: !this.state.soundOn})
  }

  render() {
    return (
      <a href="/" title="Toggles Sound" onClick={this.onToggleSoundClick}>{this.state.soundOn ?<FaVolume/>:<FaVolumeSlash/>}</a>
    )
  }

}

export default Emulator;
