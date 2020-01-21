
import React from "react"
import {CV2612Provider} from "./context"
import Midi from "./midi"
import Emulator from './emulator'
import Patches from "./patches"
import Channels from "./channels"

class Device extends React.Component {

  render() {
    return (
      <CV2612Provider>
        <div className="cv2612">
          <h3>CV-2612, a SEGA Genesis sound chip based eurorack module</h3>
            {/*
              <Emulator />
              */}
            <Midi />
            <Patches />
            <Channels />
          </div>
        </CV2612Provider>
    )
  }
}

export default Device
