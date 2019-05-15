import React from 'react'
import {CV2612Context} from "./context"

class Slider extends React.Component {
  static contextType = CV2612Context
  constructor(props) {
    super(props)
    this.code = `${props.ch}_${props.op}_${props.name}`
    this.state = {}
  }

  componentWillMount(){
    const map =this.context.mapping[this.code]
    this.max = Math.pow(2,map.bits)-1
  }

  onChange = (ev) =>{
    ev.preventDefault()
    this.context.updateParam(this.code,parseInt(ev.target.value))
    this.context.setActiveParameter(this.code)
  }

  onClick = (ev) =>{
    ev.preventDefault()
    this.context.setActiveParameter(this.code)
  }

  render() {
    const m = this.context.mapping[this.code]
    const mapped = ( (m.ch && m.cc)!==null)
    let className = 'slider'
    if(this.context.learning) className += ' learn'
    if(this.context.activeParameter === this.code) className += ' active'
    if(mapped) className += ' mapped'

    return (
      <div className={className} onClick={this.onClick} >
        <label>{this.props.name}</label>
        <input type="range" step={1} min={0} max={this.max} value={this.context.params[this.code]}
         onChange={this.onChange} />
        <span>
          {this.context.params[this.code] + (this.context.learning ? (mapped ? ` - ${m.ch}:${m.cc}` : ' - n/a'): '') }
        </span>
      </div>
    )
  }
}

Slider.defaultProps = {
  env: false,
  ch: 6,
  op: 4
}

export default Slider
