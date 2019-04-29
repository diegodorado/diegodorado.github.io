import React from 'react'
import './index.sass'
import {CV2612Context} from "../cv2612/cv2612Context"
import {reactLocalStorage} from 'reactjs-localstorage'


class Slider extends React.Component {
  static contextType = CV2612Context
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { value: props.value};

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({ value: nextProps.value })
    }
  }

  componentDidMount(){
    this.context.controls.push(this)
    const cc = reactLocalStorage.get('cc_'+this.props.code,null)
    const ch = reactLocalStorage.get('ch_'+this.props.code,null)
    if(cc && ch)
      this.setState({cc: parseInt(cc),ch: parseInt(ch)})
  }

  setMapping(cc,ch){
    this.setState({cc: cc,ch: ch})
    reactLocalStorage.set('cc_'+this.props.code,cc)
    reactLocalStorage.set('ch_'+this.props.code,ch)
    //this.forceUpdate()
  }

  onChange = (ev) =>{
    ev.preventDefault()
    this.setState({ value: ev.target.value })
    //this.props.onChange(this)
  }

  onClick = (ev) =>{
    ev.preventDefault()
    if(this.context.learning){
      this.context.activeControl = this
      for(const c of this.context.controls)
        c.forceUpdate()
    }
  }

  updateValue(val){
    const min = parseInt(this.props.max)
    const max = parseInt(this.props.min)
    const v = Math.round(min + (max-min)*val/127)
    this.setState({value: v})
    //this.props.onChange(this)
  }

  render() {
    const mapped = (typeof(this.state.ch)==='number'  && typeof(this.state.cc)==='number')
    let className = 'slider'
    if(this.context.learning) className += ' learn'
    if(this.context.activeControl === this) className += ' active'
    if(mapped) className += ' mapped'

    return (
      <div className={className} onClick={this.onClick} >
        <span>{this.props.name}</span>
        <input type="range" step="1" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.onChange} />
        <span>
          {(this.context.learning ? (mapped ? `${this.state.ch}:${this.state.cc}` : 'n/a')+` ___ `: null) }
        </span>
        <span>{this.state.value}</span>
      </div>
    );
  }
}

Slider.defaultProps = {
  min: 0,
  max: 10,
  value: 0
};



export default Slider;
