const state = {
  ma: null,
  //used to prevent loopback
  lastMsg: null,
  midiOutId: null,
}

// 1000 cc per seconds -> 250 nrpn per seconds -> interval 4
const interval = 20
const cc_queue = new Map()
const cc_cache = new Map()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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
  if (events[event]) events[event] = events[event].filter(e => e !== callback)
}

const setMidiOutId = id => (state.midiOutId = id)

const init = async () => {
  try {
    const ma = await navigator.requestMIDIAccess()
    state.ma = ma
    ma.onstatechange = refresh
    refresh()
  } catch (e) {
    console.log("Could not access your MIDI devices.")
  }
}

const refresh = () => {
  const inputs = Array.from(state.ma.inputs.values())
  const outputs = Array.from(state.ma.outputs.values())

  pub("midiStateChanged", {
    inputs,
    outputs,
  })
}

//todo: make a web woker to handle mii out msasge queue
const sendCC = async (channel, number, value) => {
  if (!state.ma) return
  //throw new Error("No midiAcces object.")

  const midiOut = state.ma.outputs.get(state.midiOutId)
  if (!midiOut) return
  //throw new Error("No midi Out.")

  let key = `${channel}-${number}`

  if (cc_cache.has(key) && cc_cache.get(key) === value) {
    return
  }

  cc_queue.set(key, value)

  let index = cc_queue.size
  let start = performance.now()
  //todo: change this awful sleep with a queue and a worker
  await sleep(interval * index)

  if (cc_queue.has(key)) {
    const value = cc_queue.get(key)

    cc_cache.set(key, value)
    midiOut.send([0xb0 + channel, number, value])

    cc_queue.delete(key)

    let elapsed = performance.now() - start
    let done = cc_queue.size === 0

    pub("midiOutProgress", { elapsed, done })
  }
}

export default {
  pub,
  sub,
  unsub,
  setMidiOutId,
  sendCC,
  init,
}
