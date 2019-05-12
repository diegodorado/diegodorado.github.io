import React from 'react'
import Slider from "../slider"
import {CV2612Context} from "../cv2612/cv2612Context"

class Operator extends React.Component {
  static contextType = CV2612Context

  envelopePoints(){
    // get an object of controls that matches
    // channel and operator
    const env = this.context.controls
              .filter(c => c.props.env && c.props.ch === this.props.ch
                                       && c.props.op === this.props.op)
              .map(c => [c.props.name,c.state.value])
              .reduce((o,i)=>{o[i[0]]=i[1];return o},{})
    const x1 = (31-env.ar)/31*100
    const y1 = env.tl/127*100
    const x2 = x1+(31-env.d1)/31*100
    const y2 = y1+(100-y1)*(env.sl/15)
    const x3 = x2+(31-env.d2)/31*100
    const y3 = y2+(100-y2)*(0.5)
    const x4 = x3+(31-env.rr)/31*100

    const points = [
        [0,100],
        [x1,y1],
        [x2,y2],
        [x3,y3],
        [x4,100]
      ]
    return points.map((p)=>p.join(',')).join(' ').replace(/NaN/g,'0')
  }

  componentDidMount(){
    this.context.operators.push(this)
  }

  render() {
    return (
      <div className="operator">
        <h4>Operator {this.props.op+1}</h4>
        <Slider env={true} name="ar" min="0" max="31"  ch={this.props.ch} op={this.props.op} />
        <Slider env={true} name="d1" min="0" max="31"  ch={this.props.ch} op={this.props.op} />
        <Slider env={true} name="sl" min="0" max="15"  ch={this.props.ch} op={this.props.op} />
        <Slider env={true} name="d2" min="0" max="31"  ch={this.props.ch} op={this.props.op} />
        <Slider env={true} name="rr" min="0" max="31"  ch={this.props.ch} op={this.props.op} />
        <Slider env={true} name="tl" min="0" max="127" ch={this.props.ch} op={this.props.op} />

        <Slider name="mul" min="0" max="15" ch={this.props.ch} op={this.props.op} />
        <Slider name="det" min="0" max="7" ch={this.props.ch} op={this.props.op} />
        <Slider name="rs" min="0" max="3" ch={this.props.ch} op={this.props.op} />
        <Slider name="am" min="0" max="1" ch={this.props.ch} op={this.props.op} />

        <svg height="100" width="400" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <polyline points={this.envelopePoints()} />
        </svg>
      </div>
    )
  }
}


Operator.defaultProps = {
  ch: 0,
  op: 0
};


export default Operator;
