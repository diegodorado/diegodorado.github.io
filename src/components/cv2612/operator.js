import React from 'react'
import Envelope from "./envelope"
import Slider from "./slider"
import {CV2612Context} from "./context"

class Operator extends React.Component {
  static contextType = CV2612Context

  render() {
    return (
      <div className="operator">
        <h5>Op {this.props.op+1}</h5>
        <Slider name="ar" ch={this.props.ch} op={this.props.op} />
        <Slider name="d1" ch={this.props.ch} op={this.props.op} />
        <Slider name="sl" ch={this.props.ch} op={this.props.op} />
        <Slider name="d2" ch={this.props.ch} op={this.props.op} />
        <Slider name="rr" ch={this.props.ch} op={this.props.op} />
        <Slider name="tl" ch={this.props.ch} op={this.props.op} />
        <Envelope ch={this.props.ch} op={this.props.op} />
        <Slider name="mul" ch={this.props.ch} op={this.props.op} />
        <Slider name="det" ch={this.props.ch} op={this.props.op} />
        <Slider name="rs" ch={this.props.ch} op={this.props.op} />
        <Slider name="am" ch={this.props.ch} op={this.props.op} />
      </div>
    )
  }
}


Operator.defaultProps = {
  ch: 6
};


export default Operator;
