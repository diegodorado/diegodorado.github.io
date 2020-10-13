import React from "react"
import {CV2612Provider} from "./context"
import SEO from "../../components/seo"
import "./styles.sass"
import Midi from "./midi"
//import Emulator from './emulator'
import Presets from "./presets"
import Scene from "./scene"

const Device = () =>
    (
      <CV2612Provider>
          <SEO title="cv2612" />
          <h3>CV-2612, a SEGA Genesis sound chip based eurorack module</h3>
          {/*
            <Emulator />
            */}
          <Midi />
          <Presets />
          <Scene />
      </CV2612Provider>
    )

export default Device
