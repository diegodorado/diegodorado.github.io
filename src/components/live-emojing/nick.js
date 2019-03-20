import React from "react"
import PropTypes from 'prop-types'
import {reactLocalStorage} from 'reactjs-localstorage'

class Nick extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nick: '',
      valid: false,
      confirmed: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.connected !== this.props.connected){
      this.setState({connected:nextProps.connected});
    }
  }

  componentDidMount(){
    const nick = reactLocalStorage.get('nick', '')
    if(nick!==''){
      this.setState({nick: nick, valid: true, confirmed: true})
      this.props.onChanged(nick)
    }
  }

  onChange = (e) => {
    this.setState({nick: e.target.value, valid: e.target.validity.valid});
  }

  onChangeClick = (e) => {
    e.preventDefault()
    this.setState({confirmed: false});
    this.props.onChanged('')
  }



  confirm = () => {
    if(this.state.valid){
      reactLocalStorage.set('nick', this.state.nick)
      this.setState({confirmed: true});
      this.props.onChanged(this.state.nick)
    }
  }

  onConfirm = (e) => {
    e.preventDefault()
    this.confirm()
  }

  onKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.confirm()
    }
  }

  render() {
    let nick = null

    if (this.state.connected) {
      if(this.state.confirmed){
        nick = (
          <div className="nick">
            <p>
              Hi {this.state.nick}! <em><a href="/" onClick={this.onChangeClick}>Change nick</a></em>
            </p>
          </div>
        )
      }else{
        nick = (
          <div className="nick">
            <p>
              Choose a nickname.
            </p>
            <input placeholder="funky-duck" type="text" value={this.state.nick} onChange={this.onChange} required pattern="^[A-Za-z0-9_-]{3,15}$" onKeyPress={this.onKeyPress} />
            <button onClick={this.onConfirm}>{"Let's"} Play</button>
          </div>
        )
      }
    }

    return nick
  }
}

//And don't forget that the child will need this function declared in its propTypes:

Nick.propTypes = {
  onChanged: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
};

export default Nick
