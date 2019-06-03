import React from 'react'
import {CV2612Context} from "./context"
import AudioKeys from 'audiokeys'
import { FaVolume,
         FaVolumeSlash
        } from 'react-icons/fa'

//todo: update for all 6 channels
//todo: unload properly

const kb = new AudioKeys({polyphony: 1,rows: 1,priority: 'last',octave: 2})


class Emulator extends React.Component {
  static contextType = CV2612Context
  audioCtx = null

  constructor(props) {
    super(props)
    this.state = {soundOn: false}
    this.fftSize = 1024
  }

  componentDidMount(){

    this.audioCtx = new AudioContext()
    if(this.audioCtx.state==='running')
       this.initialize()


    this.notes = []
    this.context.emulator = this
    kb.down(this.onKeyDown)
    kb.up(this.onKeyUp)

    this.scope = this.refs.scope.getContext("2d")
    this.scope.fillStyle = 'rgba(0, 20, 0, 0.1)'
    this.scope.lineWidth = 2;
    this.scope.strokeStyle = '#509eec'
    this.spectrum = this.refs.spectrum.getContext("2d")
    this.spectrum.fillStyle = 'rgba(0, 20, 0, 0.1)'
    this.spectrum.lineWidth = 1;
    this.spectrum.strokeStyle = '#509eec'

    this.stopAnimation = false
    this.timeData = new Uint8Array(this.fftSize).fill(128)
    this.freqData = new Uint8Array(this.fftSize)

    requestAnimationFrame(this.tick)

  }

  componentWillUnmount(){
    this.audioCtx.suspend()
    kb._listeners.down = []
    kb._listeners.up = []
    this.stopAnimation = true
    this.timeData = null
    this.freqData = null

  }

  tick = () => {
    if (this.stopAnimation)
       return

    //this.drawScope()
    //this.drawSpectrum()
    //requestAnimationFrame(this.tick)
  }

  drawScope(){

    const ctx = this.scope
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const l = this.fftSize
    const scaling = height / 256

    if(this.analyser)
      this.analyser.getByteTimeDomainData(this.timeData)


    ctx.fillRect(0, 0, width, height)
    ctx.beginPath()

    const e = this.timeData.reduce( (acc, it, i, a) => {
      return ((acc===0) && (i>0) && (i<l-10) && a[i-1]<128 && a[i+10]>128) ? i : acc
    } , 0)

    for (let x = e; x < l && x - e < width; x++)
      ctx.lineTo(x - e, height - this.timeData[x] * scaling)

    ctx.stroke()
  }

  drawSpectrum() {
    const ctx = this.spectrum
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const l = this.fftSize
    const scaling = height / 256
    const scalingX = width / l

    if(this.analyser)
      this.analyser.getByteFrequencyData(this.freqData)

    ctx.fillRect(0, 0, width, height)
    ctx.beginPath()

    const toLog = (value, min, max) =>{
      const exp = (value-min) / (max-min)
      return min * Math.pow(max/min, exp)
    }


    for (let i = 1; i < l; i++) {
      var logindex = toLog(i,1,l-1)
      //As the logindex will probably be decimal, we need to interpolate (in this case linear interpolation)
      const low = Math.floor(logindex)
      const high = Math.ceil(logindex)
      const lv = this.freqData[low]
      const hv = this.freqData[high]
      const w = (logindex-low)/(high-low)
      const v = lv + (hv-lv)*w

      ctx.lineTo(i*scalingX, height - v * scaling)

    }

    ctx.stroke()
  }


  initialize(){

    this.audioCtx.audioWorklet.addModule('/cv2612/ym2612-processor.js').then(() => {
      this.ym2612Node = new AudioWorkletNode(this.audioCtx, 'ym2612-generator', { outputChannelCount: [2] })
      this.ym2612Node.port.onmessage = (event) => {console.log(event.data)}
      this.ym2612Node.connect(this.audioCtx.destination)

      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = this.fftSize
      this.ym2612Node.connect(this.analyser)

      this.write(0x27,0x00) //chan3 normal mode
      this.write(0x28,0x00)
      // load all patch params
      this.context.sendParameters(this.context.params)
    })

     this.setState({soundOn: true})

  }


  noteOn = (note) => {
    const f = ( Math.pow(2, ( note-69 ) / 12) ) * 440.0
    this.onKeyDown({note:note,frequency:f})
  }

  noteOff = (note) => {
    this.onKeyUp({note:note})
  }

  onKeyDown = (note) => {
    if(note.note<0 || note.note>127 )
      return

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
    if(note.note<0 || note.note>127 )
      return

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

    //console.log(address.toString(16),value.toString(16))
    this.ym2612Node.port.postMessage([address,value])
  }


  update = (ch,op,param,value,params) =>{
    const globals = ['lfo','en']
    const channels = ['fb','ams','fms','st','al']
    const operators = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am']


    // register filters... somehow messy
    if((ch===6 || op===4) && operators.includes(param))
      return

    if((ch===6) && channels.includes(param))
      return

    if((op!==4) && channels.includes(param))
      return

    if((op!==4 || ch!==6) && globals.includes(param))
      return


    const ch_off = (Math.floor(ch/3) * 0x100 + ch%3 )
    const mask = (key,size,shift) =>{
      return (params[`${ch}_${op}_${key}`] & (Math.pow(2,size)-1))<<shift
    }

    if(param==='lfo' || param==='en' ){
      const v = mask('en',1,3)|mask('lfo',3,0)
      this.write(0x22, v)
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

    if(this.audioCtx.state === 'running') {
      this.audioCtx.suspend().then(() => {
        this.setState({soundOn: false})
      });
    } else if(this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().then(()=> {
        this.initialize()
      });
    }
  }

  render() {
    return (
      <div className="emulator">
        <nav>
          <a href="/" title="Toggles Sound" onClick={this.onToggleSoundClick}>{this.state.soundOn ?<FaVolume/>:<FaVolumeSlash/>}</a>
        </nav>
        <canvas ref="scope" width={200} height={60} />
        <canvas ref="spectrum" width={200} height={60} />
      </div>
    )
  }

}

export default Emulator;
