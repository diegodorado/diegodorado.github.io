import React, {useContext} from "react"
import {CV2612Context} from "./context"
import Operator from "./operator"
import Slider from "./slider"
import algorithmAscii from "./utils/algorithmAscii"

const Channel = (props) =>{
  const context = useContext(CV2612Context)
  return (
    <div className="channel">
      <table>
        <tbody>
          <tr>
            <td colSpan={3}>
              <table>
                <tbody>
                  <tr>
                    <td><Slider name="fb" /></td>
                    <td><Slider name="st" /></td>
                    <td><Slider name="al" /></td>
                  </tr>
                  <tr>
                    <td><Slider name="ams" /></td>
                    <td><Slider name="fms" /></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <pre className="algorithm">
                {algorithmAscii(context.params[`${context.filters.ch}_4_al`])}
              </pre>
            </td>
          </tr>
          <tr>
            <td><Operator op={0} /></td>
            <td><Operator op={2} /></td>
            <td><Operator op={1} /></td>
            <td><Operator op={3} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Channel
