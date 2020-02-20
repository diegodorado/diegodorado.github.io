const state = {
  ma: null,
  //used to prevent loopback
  lastMsg: null,
  midiCtrlInId: null,
  midiOutId: null
}

// 1000 cc per seconds -> 250 nrpn per seconds -> interval 4
const interval = 10
const nrpn_queue = new Map()

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const events = {}

const pub = (event, data) => {
  if (!events[event]) return
  events[event].forEach(callback => callback(data))
}

const sub = (event, callback) => {
  if (!events[event]) events[event] = []
  events[event].push(callback)
}

const unsub = (event, callback) => {
  if (events[event])
    events[event] = events[event].filter(e => e!==callback)
}


const setMidiCtrlInId = id => state.midiCtrlInId = id
const setMidiOutId = id => state.midiOutId = id

const init = () => {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(
    (ma) => {
      state.ma = ma
      ma.onstatechange = refresh
      refresh()
    }, () => console.log('Could not access your MIDI devices.'))
}


const refresh = (e) => {
  const inputs = Array.from(state.ma.inputs.values())
  const outputs = Array.from(state.ma.outputs.values())
  for (let i of inputs)
    i.onmidimessage = midiInHandler

  pub('midiStateChanged', {
    inputs,
    outputs
  })

}

// maybe sould implement SendNote, SendCC and SendNPRN separately
const sendMidi = async data => {
  if (state.ma === null)
    throw new Error("No midiAcces object.")

  const midiOut = state.ma.outputs.get(state.midiOutId)

  if (midiOut === null)
    throw new Error("No midi Out.")

  midiOut.send(data)
  pub('midiOutProgress', {done:true})

}


const sendNRPN = async (channel, nrpn_msb, nrpn_lsb, data_msb, data_lsb) => {
  if (!state.ma)
    return
    //throw new Error("No midiAcces object.")

  const midiOut = state.ma.outputs.get(state.midiOutId)
  if (!midiOut)
    return
    //throw new Error("No midi Out.")

  let key = `${channel}-${nrpn_msb}-${nrpn_lsb}`
  nrpn_queue.set(key, {
    data_msb,
    data_lsb
  })

  let index = nrpn_queue.size
  let start = performance.now()
  await sleep(interval * index)

  if (nrpn_queue.has(key)) {
    let {
      data_msb,
      data_lsb
    } = nrpn_queue.get(key)

    midiOut.send([0xB0 + channel, 0x63, nrpn_msb]) //NRPN MSB: CC99
    midiOut.send([0xB0 + channel, 0x62, nrpn_lsb]) //NRPN LSB: CC98
    midiOut.send([0xB0 + channel, 0x06, data_msb]) //Data Entry MSB: CC6
    midiOut.send([0xB0 + channel, 0x26, data_lsb]) //Data Entry LSB: CC38

    nrpn_queue.delete(key)

    let elapsed = performance.now() - start
    let done = (nrpn_queue.size === 0)

    pub('midiOutProgress', {elapsed,done})

  }

}


const midiCtrlInMsg = (data) => {
  const type = data[0] & 0xf0

  if (type === 0xB0) {
    pub('onControlChange',data)
  }

  // resend noteon/off events
  if (type === 0x80 || type === 0x90) {
    sendMidi(data)
    if (type === 0x90) {
      pub('onNoteOn',data)
    } else {
      pub('onNoteOff',data)
    }
  }

}


const midiInHandler = (msg) => {
    const data = Array.from(msg.data)
    //warning: filter loopback messages somehow
    if (JSON.stringify(state.lastMsg) === JSON.stringify(data)) {
      pub('midiLoopback')
      return
    }
    if (msg.target.id === state.midiCtrlInId){
      pub('midiCtrlInMsg')
      midiCtrlInMsg(data)
    }

}

export default {
  pub,
  sub,
  unsub,
  setMidiCtrlInId,
  setMidiOutId,
  sendNRPN,
  init
}
