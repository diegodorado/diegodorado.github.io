import React from 'react'
//import './index.sass'
import Slider from "../slider"

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ch: 0,
      op: 0,
      ar:0,
      d1:0,
      sl:0,
      d2:0,
      rr:0,
      tl:0,
    }
  }

  envelopePoints(){
    const x1 = (31-this.state.ar)/31*100
    const y1 = this.state.tl/127*100
    const x2 = x1+(31-this.state.d1)/31*100
    const y2 = y1+(100-y1)*(this.state.sl/15)
    const x3 = x2+(31-this.state.d2)/31*100
    const y3 = y2+(100-y2)*(0.5)
    const x4 = x3+(31-this.state.rr)/31*100

    const points = [
        [0,100],
        [x1,y1],
        [x2,y2],
        [x3,y3],
        [x4,100]
      ]
    return points.map((p)=>p.join(',')).join(' ')
  }

  onSliderChange(slider){
    let s = {}
    s[slider.props.name] = slider.state.value
    this.setState(s)
    //console.log(this,slider)
  }

  render() {

    return (
      <div className="operator">
        <table>
          <tbody>
          <tr>
            <td>
              <Slider name="ar" min="0" max="31"  code={`${this.state.ch}_${this.state.op}_ar`}/>
              <Slider name="d1" min="0" max="31"  code={`${this.state.ch}_${this.state.op}_d1`}/>
              <Slider name="sl" min="0" max="15"  code={`${this.state.ch}_${this.state.op}_sl`}/>
              <Slider name="d2" min="0" max="31"  code={`${this.state.ch}_${this.state.op}_d2`}/>
              <Slider name="rr" min="0" max="31"  code={`${this.state.ch}_${this.state.op}_rr`}/>
              <Slider name="tl" min="0" max="127" code={`${this.state.ch}_${this.state.op}_tl`}/>
            </td>
            <td>
              <svg height="100" width="400" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" style={{stroke: '#509eec'}}>
                <polyline points={this.envelopePoints()} />
              </svg>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Operator;
