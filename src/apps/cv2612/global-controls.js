import React from "react"
import Slider from "./slider"
import CvInput from "./cv_input"

const GlobalControls = () =>
  (
      <>
        <div className="four-cols">
          <div className="col">
            <Slider name="bl"/>
          </div>
          <div className="col">
            <CvInput code="x"/>
          </div>
          <div className="col">
            <CvInput code="y"/>
          </div>
          <div className="col">
            <CvInput code="z"/>
          </div>
        </div>
        <div className="four-cols">
          <div className="col">
            <Slider name="lfo"/>
          </div>
          <div className="col">
            <Slider name="pm" />
          </div>
          <div className="col">
            <Slider name="vs" />
            {/*
              <Slider name="cc"/>
              */}
          </div>
          <div className="col">
            <Slider name="li"/>
          </div>
        </div>
      </>
  )

export default GlobalControls
