import React, { useEffect, useReducer } from "react"
import { calculateEnvelopePoints } from "./utils/envelopePoints"
import MidiIO from "./midi-io"

const CV2612Context = React.createContext()

/*
 * A Patch is the state of the YM2612 regarding sound design.
 * What defines a patch is the value of the whole parameters set,
 * which can be defined by a set of CC values.
 */
const emptyPatch = () => {
  const ccsPerChannel = []
  for (let i = 0; i < 6; i++) {
    const ccs = {
      20: 0, // al
      21: 0, // fb
      22: 0, // ams
      23: 0, // fms
      24: 3 << 5, // st
    }
    for (let op = 0; op < 4; op++) {
      ccs[`${30 + op * 10 + 0}`] = 0 // ar
      ccs[`${30 + op * 10 + 1}`] = 0 // d1
      ccs[`${30 + op * 10 + 2}`] = 0 // sl
      ccs[`${30 + op * 10 + 3}`] = 0 // d2
      ccs[`${30 + op * 10 + 4}`] = 0 // rr
      ccs[`${30 + op * 10 + 5}`] = 0 // tl
      ccs[`${30 + op * 10 + 6}`] = 0 // mul
      ccs[`${30 + op * 10 + 7}`] = 0 // det
      ccs[`${30 + op * 10 + 8}`] = 0 // rs
      ccs[`${30 + op * 10 + 9}`] = 0 // am
    }
    ccsPerChannel.push(ccs)
  }
  ccsPerChannel[0][1] = 0 // lfo

  return ccsPerChannel
}

const emptyPatches = () => {
  const patches = []
  for (let i = 0; i < 4; i++) {
    patches.push(emptyPatch())
  }
  return patches
}

const initialState = {
  activeBinding: null,
  bindings: { x: [], y: [], z: [] },
  envelopes: {},
  patches: emptyPatches(),
  patchIdx: 0,
  channelIdx: 0,
}

const updateEnvelope = (patch, ch, op) => {
  const ar = patch[ch][30 + 10 * op + 0] / 127
  const d1 = patch[ch][30 + 10 * op + 1] / 127
  const sl = patch[ch][30 + 10 * op + 2] / 127
  const d2 = patch[ch][30 + 10 * op + 3] / 127
  const rr = patch[ch][30 + 10 * op + 4] / 127
  const tl = patch[ch][30 + 10 * op + 5] / 127

  return calculateEnvelopePoints({ ar, d1, sl, d2, rr, tl })
}

const updateParam = (state, ch, cc, val) => {
  const patch = state.patches[state.patchIdx]

  // update patch state
  patch[ch][cc] = val

  // sync midi cc
  MidiIO.sendCC(ch, cc, val)

  const envelopes = { ...state.envelopes }

  // does this parameter change an envelope?
  if (cc >= 30 && cc < 70 && cc % 10 <= 5) {
    // get operator index from cc
    const op = Math.floor((cc - 30) / 10, 0)

    envelopes[op] = updateEnvelope(patch, ch, op)
  }

  return { ...state, envelopes }
}

const updateParams = (state, sendMidi = true) => {
  const envelopes = { ...state.envelopes }
  const patch = state.patches[state.patchIdx]
  const ch = state.channelIdx

  // TODO: do not asume envelopes have changed
  for (let op = 0; op < 4; op++) {
    envelopes[op] = updateEnvelope(patch, ch, op)
  }

  if (sendMidi) {
    //TODO: cache a sync status between device and webpage
    //have a first sync, and then update only changed params

    patch.forEach((ccs, ch) => {
      Object.entries(ccs).forEach(([key, val]) => {
        const cc = parseInt(key, 10)
        // sync midi cc
        MidiIO.sendCC(ch, cc, val)
      })
    })
  }

  return { ...state, envelopes }
}

//TODO: udpateParams without sending MIDI out
const reducer = (state, action) => {
  switch (action.type) {
    case "provider-ready":
      return updateParams(state, true)
    case "update-param":
      return updateParam(state, action.ch, action.cc, action.val)
    case "touch-param":
      if (state.activeBinding) {
        const bindings = { ...state.bindings }
        if (bindings[state.activeBinding].includes(action.cc)) {
          console.log("included", bindings[state.activeBinding])
          bindings[state.activeBinding] = bindings[state.activeBinding].filter(
            cc => cc !== action.cc
          )
        } else {
          bindings[state.activeBinding].push(action.cc)
        }
        // TODO: sendCC to bin on device
        return { ...state, bindings }
      } else {
        return state
      }

    case "toggle-binding":
      return {
        ...state,
        activeBinding:
          action.binding === state.activeBinding ? null : action.binding,
      }
    case "change-patch":
      // TODO: prompt user to save
      const patchIdx = action.index
      return updateParams({ ...state, patchIdx }, false)
    case "change-channel":
      const channelIdx = action.index
      return updateParams({ ...state, channelIdx }, false)
    case "save-patch":
      MidiIO.sendNRPN(0, 64, 0, action.index, 0)
      return state
    default:
      throw new Error("Invalid action type")
  }
}

const CV2612Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(() => {
    ;(async () => {
      await MidiIO.init()
      dispatch({ type: "provider-ready" })
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CV2612Context.Provider value={value}>{children}</CV2612Context.Provider>
  )
}

const CV2612Consumer = CV2612Context.Consumer

export { CV2612Context, CV2612Provider, CV2612Consumer }
