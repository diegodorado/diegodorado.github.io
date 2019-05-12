import React from 'react'
import Operator from "./operator"
import Slider from "../slider"
import {CV2612Context} from "./cv2612Context"

class Channel extends React.Component {
  static contextType = CV2612Context

  constructor(props){
    super(props)
    this.state = {
      algorithm: 0
    }
  }

  onChangeAlgorithm = (val) =>{
    this.setState({algorithm: parseInt(val)})
  }

  algorithmSvg(){
    switch(this.state.algorithm) {
      case 0:
        return '1 -> 2 -> 3 -> 4'
      case 1:
        return '(1 + 2) -> 3 -> 4'
      case 2:
        return '(1 + (2 -> 3)) -> 4'
      case 3:
        return '((1 -> 2 ) +  3) -> 4'
      case 4:
        return '(1 -> 2 ) +  (3 -> 4)'
      case 5:
        return '(1 -> 2 ) + (1 -> 3 ) +  (1 -> 4)'
      case 6:
        return '(1 -> 2 ) + 3 +  4'
      case 7:
        return '1 + 2 + 3 +  4'
    }
  }


  render() {
    return (
      <>
      <h4>Channel {this.props.ch+1}</h4>
      <Slider name="al" min={0} max={7}  ch={this.props.ch} onChange={this.onChangeAlgorithm} />
      <h5>{this.algorithmSvg()}</h5>
      <table>
        <tbody>
          <tr>
            <td>
              <Slider name="fb" min={0} max={7}  ch={this.props.ch}  />
            </td>
            <td>
              <Slider name="ams" min={0} max={3}  ch={this.props.ch}  />
            </td>
            <td>
              <Slider name="fms" min={0} max={7}  ch={this.props.ch}  />
            </td>
            <td>
              <Slider name="st" min={0} max={3}  ch={this.props.ch}  />
            </td>
          </tr>
          <tr>
            <td>
              <Operator ch={this.props.ch} op={0} />
            </td>
            <td>
              <Operator ch={this.props.ch} op={1} />
            </td>
            <td>
              <Operator ch={this.props.ch} op={2} />
            </td>
            <td>
              <Operator ch={this.props.ch} op={3} />
            </td>
          </tr>
        </tbody>
      </table>
      </>
    )
  }
}


Channel.defaultProps = {
  ch: 0
}

export default Channel;
