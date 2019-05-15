import React from 'react'
import {CV2612Context} from "./context"

let seqTimeOut
let seqNote = 0
let seqNoteOn = false

class Sequencer extends React.Component {
  static contextType = CV2612Context

  constructor(props){
    super(props);
    this.state = {
      sequencerOn: false,
    }
  }

  componentWillUnmount() {
    this.sequencerStop()
  }


  onClick = (e) => {
    e.preventDefault()
    this.setState({sequencerOn: !this.state.sequencerOn})
  }

  sequencerStop() {
    clearTimeout(seqTimeOut)
    if(seqNoteOn){
      this.context.midi.sendMidi([0x80,seqNote,0x00])
      seqNoteOn = false
    }
  }

  sequencerTick() {
    if(seqNoteOn){
      this.context.midi.sendMidi([0x80,seqNote,0x00])
      seqNoteOn = false
    }
    else{
      //sets a random note
      seqNote = [0,3,5,7,10].sort(() => Math.random() - 0.5)[0]
                     + (3+Math.floor(Math.random()*5))*12
      this.context.midi.sendMidi([0x90,seqNote,100])
      seqNoteOn = true
    }

    if(this.state.sequencerOn){
      const duration = 500/Math.pow(2,Math.floor(Math.random()*5))
      seqTimeOut = setTimeout(()=> this.sequencerTick(), duration)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sequencerOn !== this.state.sequencerOn){
      if(this.state.sequencerOn){
        this.sequencerTick()
      }else{
        this.sequencerStop()
      }
    }
  }

  render() {
    //todo: fixme
    return null
    return (
      <button onClick={this.onClick}>{this.state.sequencerOn ? 'Stop Seq':'Start Seq'}</button>
    )
  }
}


export default Sequencer
