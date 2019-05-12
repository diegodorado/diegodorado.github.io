import React from 'react'
import './index.sass'
import {CV2612Context} from "../cv2612/cv2612Context"
import {reactLocalStorage} from 'reactjs-localstorage'


class Slider extends React.Component {
  static contextType = CV2612Context
  constructor(props) {
    super(props)
    //todo: read from device
    this.state = { value: props.min, code: `${props.ch}_${props.op}_${props.name}`};

  }

  componentDidMount(){
    this.context.controls.push(this)
    const cc = reactLocalStorage.get('cc_'+this.state.code,null)
    const ch = reactLocalStorage.get('ch_'+this.state.code,null)
    if(cc && ch)
      this.setState({cc: parseInt(cc),ch: parseInt(ch)})
  }

  setMapping(cc,ch){
    this.setState({cc: cc,ch: ch})
    reactLocalStorage.set('cc_'+this.state.code,cc)
    reactLocalStorage.set('ch_'+this.state.code,ch)
  }

  isMapped(){
    return (typeof(this.state.ch)==='number'  && typeof(this.state.cc)==='number')
  }

  onChange = (ev) =>{
    ev.preventDefault()

    const min = parseInt(this.props.min)
    const max = parseInt(this.props.max)
    const val = Math.round(parseInt(ev.target.value) * 127 - min )/(max-min)

    this.updateValue(val)

    if(this.props.env)
      this.context.updateEnvelope(this.props.ch,this.props.op)
    if(this.context.learning)
      this.context.setActiveControl(this)

  }

  updateValue(val){
    const min = parseInt(this.props.min)
    const max = parseInt(this.props.max)
    const v = Math.round(min + (max-min)*val/127)
    this.setState({value: v})
    if(this.props.onChange)
      this.props.onChange(v)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.value !== this.state.value){
      //if(this.isMapped()){
        //send the midi cc or sysex
        this.context.sendCtrl(this)
      //}
    }
  }

  onClick = (ev) =>{
    ev.preventDefault()
    if(this.context.learning){
      this.context.setActiveControl(this)
    }
  }

  render() {
    let className = 'slider'
    if(this.context.learning) className += ' learn'
    if(this.context.activeControl === this) className += ' active'
    if(this.isMapped()) className += ' mapped'

    return (
      <div className={className} onClick={this.onClick} >
        <label>{this.props.name}</label>
        <input type="range" step="1" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.onChange} />
        <span>
          {this.state.value + (this.context.learning ? (this.isMapped() ? ` - ${this.state.ch}:${this.state.cc}` : ' - n/a'): '') }
        </span>
      </div>
    )
  }
}

Slider.defaultProps = {
  min: 0,
  max: 10,
  env: false
};

export default Slider;
