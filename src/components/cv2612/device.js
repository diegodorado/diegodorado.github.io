
import React from "react"
import {CV2612Provider} from "./context"
import Midi from "./midi"
import Emulator from './emulator'
import Sequencer from "./sequencer"
import Patches from "./patches"
import Channels from "./channels"

class Device extends React.Component {

  render() {
    return (
        <CV2612Provider>
          <Emulator />
          <Midi />
          <Sequencer />
          <Patches />
          <Channels />
        </CV2612Provider>
    )
  }
}

export default Device
