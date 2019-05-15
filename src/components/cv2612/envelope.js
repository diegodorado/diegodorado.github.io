import React from 'react'
import {CV2612Context} from "./context"

class Envelope extends React.Component {
  static contextType = CV2612Context
  constructor(props) {
    super(props)
    this.state = {}
    this.code = `${props.ch}_${props.op}`
  }

  render() {
    return (
      <div className="envelope">
        <svg height="100" width="400" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <polyline points={this.context.envelopes[this.code]} />
        </svg>
      </div>
    )
  }
}

Envelope.defaultProps = {
  ch: 6,
  op: 4
};


export default Envelope;
