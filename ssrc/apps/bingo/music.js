import React from "react"
import Canvas from "./canvas"
import {navigate } from "gatsby"

const Music = () => {
  return (
    <div className="game only-music">
      <div className="main">
        <Canvas onlyMusic={true} />
      </div>
      <br/>
      <br/>
      <button onClick={() => navigate('/bingo')}>VOLVER</button>
    </div>
  ) 
}

export default Music
