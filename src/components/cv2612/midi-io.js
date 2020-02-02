let interval = 50
let queuedData = 0

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


class MidiIO {
  caller = null
  ma= null
  //use to prevent loopback
  lastMsg = null

  constructor(callerObject){
    this.caller = callerObject
    navigator.requestMIDIAccess( { sysex: false }).then(
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


  //todo: turn into a promise
  sendMidi = (data) => {
    if(this.ma===null){
      return
    }
    const midiOut = this.ma.outputs.get(this.caller.state.midiOutId)
    if(midiOut){
      this.delayedSendMidi(data).then(
        ({index,queuedData,data, elapsed, pending}) => {
          midiOut.send(data)
          console.log(index,queuedData, pending)
        }
      )

    }else{
      //console.log('no midi out')
    }

  }


  delayedSendMidi = async data => {
    let index = queuedData
    let start = performance.now()
    queuedData++
    await sleep(interval*index)
    let elapsed = performance.now() - start
    queuedData--
    let pending = interval*queuedData
    return {index,queuedData,data, elapsed, pending}
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


  // only nprn messages are expected here
  // but not in this version yet
  onMIDIMessage = (msg) => {

    if(msg.target.id !== this.caller.state.midiInId)
      return

    const data = Array.from(msg.data)

    //warning: filter loopback messages somehow
    if(JSON.stringify(this.lastMsg) === JSON.stringify(data)){
      this.caller.onLoopBack()
      return
    }

    // todo: handle nprn messages

  }

}

export default MidiIO
