import React from 'react'
import Operator from "./operator"
import Slider from "./slider"
import {CV2612Context} from "./context"
import algorithmAscii from "./utils/algorithmAscii"

class Channel extends React.Component {
  static contextType = CV2612Context

  render() {
    return (
      <div className="channel">
        <table>
          <tbody>
            <tr>
              <td><Slider name="lfo" /></td>
              <td></td>
              <td><Slider name="al" ch={this.props.ch} /></td>
              <td>
                <pre className="algorithm">
                  {algorithmAscii(this.context.params[`${this.props.ch}_4_al`])}
                </pre>
              </td>
            </tr>
            <tr>
              <td><Slider name="fb"  ch={this.props.ch} /></td>
              <td><Slider name="ams" ch={this.props.ch} /></td>
              <td><Slider name="fms" ch={this.props.ch} /></td>
              <td><Slider name="st"  ch={this.props.ch} /></td>
              <td></td>
            </tr>
            <tr>
              <td><Operator ch={this.props.ch} op={0} /></td>
              <td><Operator ch={this.props.ch} op={1} /></td>
              <td><Operator ch={this.props.ch} op={2} /></td>
              <td><Operator ch={this.props.ch} op={3} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Channel.defaultProps = {
  ch: 6
}

export default Channel
