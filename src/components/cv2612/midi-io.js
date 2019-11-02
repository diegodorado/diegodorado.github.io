//import {encodeSysEx, decodeSysEx} from "./utils/sysex"


class MidiIO {
  caller = null
  ma= null
  //use to prevent loopback
  lastMsg = null

  constructor(callerObject){
    this.caller = callerObject
    navigator.requestMIDIAccess( { sysex: true }).then(
      (ma)=>{
        this.ma = ma
        ma.onstatechange = this.refresh
        this.refresh()
      },()=>console.log('Could not access your MIDI devices.'))

  }

  refresh = (e) => {
    const inputs = Array.from(this.ma.inputs.values())
    const outputs = Array.from(this.ma.outputs.values())
    for(let i of inputs)
      i.onmidimessage = this.onMIDIMessage

    this.caller.onStateChange(inputs,outputs)
  }


  sendHandshake2 = async () => {
    const deviceIdRequest = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7]
    return this.sendSysex(deviceIdRequest).then(data =>{
        return data
    })

  }


  sendHandshake = async () => {
    const idReply = [0xF0, 0x7E, 0x00, 0x06, 0x02,  //identity reply
        0x26, 0x26, 0x12, 0x00, 0x00, // ID - family code - model number
        0x01, 0x00, 0x00, 0x00, 0xF7] //version - end

    const deviceIdRequest = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7]
    return this.sendSysex(deviceIdRequest).then(data =>{
      if(JSON.stringify(data) === JSON.stringify(idReply)){
        return (`CV2612 found!`)
      }else{
        throw new Error('Not a CV2612 found!')
      }
    })

  }


  // only one sysex at a time
  sysexPromisePending = false
  sysexPromiseResolve = null
  // sysex is a promise because we always expect an aknowledge
  sendSysex = async (data) => {

    if(this.sysexPromisePending)
      throw new Error('A sysex message is pending')

    const ms = 500
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        this.sysexPromisePending = false
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    })

    const sysexPromise = new Promise((resolve, reject) => {
      this.sendMidi(data)
      this.sysexPromisePending = true
      this.sysexPromiseResolve = resolve
    });

    return Promise.race([sysexPromise,timeout])

  }


  sendSysexSet = async (data) => {
    // send data header
    const msg = [0xF0, 0x41, 0x26, 0x12, 0x12]
    let sum = 0
    for(let d of data){
      msg.push(d)
      sum += d
    }
    // checksum
    msg.push(0x7F - (sum%0x7F))
    // end byte
    msg.push(0xF7)
    return this.sendSysex(msg)
  }

  //todo: turn into a promise
  sendMidi = (data) => {
    if(this.ma===null){
      return
    }
    const midiOut = this.ma.outputs.get(this.caller.state.midiOutId)
    if(midiOut){
      midiOut.send(data)
    }else{
      console.log('no midi out')
    }

  }

  onCtrlMIDIMessage = (msg) => {

    if(msg.target.id !== this.caller.state.midiCtrlInId)
      return

    const data = Array.from(msg.data)


    //warning: filter loopback messages somehow
    if(JSON.stringify(this.lastMsg) === JSON.stringify(data)){
      this.caller.onLoopBack()
      return
    }


    const type = data[0] & 0xf0

    if(type === 0xB0){
      const ch = data[0] & 0x0f
      const cc = data[1] & 0x7f
      const val = data[2] & 0x7f
      this.caller.onControlChange(ch,cc, val)
    }

    // resend noteon/off events
    if(type === 0x80 || type === 0x90){
      this.sendMidi(data)

      if(type === 0x90){
        this.caller.onNoteOn(data[1], data[2])
      }else{
        this.caller.onNoteOff(data[1], data[2])
      }
    }

  }


  //only sysex messages are expected here
  onMIDIMessage = (msg) => {

    if(msg.target.id !== this.caller.state.midiInId)
      return

    const data = Array.from(msg.data)

    //warning: filter loopback messages somehow
    if(JSON.stringify(this.lastMsg) === JSON.stringify(data)){
      this.caller.onLoopBack()
      return
    }

    // sysex status byte. resolve the promise
    if(data[0]===0xF0){
      this.sysexPromisePending = false
      this.sysexPromiseResolve(data)
    }

  }

}

export default MidiIO
