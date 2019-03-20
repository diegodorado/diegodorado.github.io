import React from "react"
import PropTypes from 'prop-types'
import {reactLocalStorage} from 'reactjs-localstorage'
import { Picker } from 'mr-emoji'
import '../../../node_modules/mr-emoji/css/emoji-mart.css'
import { FaBackspace,
         FaCaretLeft,
         FaCaretRight,
         FaCaretUp,
         FaUpload,
         FaDice,
        } from 'react-icons/fa'
import {alphaEmoji,
        randomPattern,
        emojiArray,
        customEmojis,
        recentEmojis,
        includeEmojis,
        i18nEmojis } from './utils'

class Playground extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      left: '',
      right: ''
    }
  }



  componentDidMount(){
    const pattern = reactLocalStorage.get('pattern', randomPattern())
    this.setState({left: pattern, right: ''})
    document.addEventListener("keydown", this.onKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyPress, false);
  }

  addEmoji= (e) => {
    this.setState({ left: this.state.left + (!e.custom ? e.native : e.name) })
  }

  onCommitClick = (e) => {
    e.preventDefault()
    this.commit()
  }


  onKeyPress = (e) => {
    const c = e.key.toLowerCase()
    if( c.length===1 &&  c >='a' && c <='z'){
      const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
      this.setState({ left: this.state.left + alphaEmoji[i] })
    }
    else if(customEmojis.map((e)=>e.name).includes(e.key)){
      e.preventDefault()
      this.setState({ left: this.state.left + e.key })
    }
    else if(e.key === 'ArrowLeft'){
      this.onLeftClick(e)
    }
    else if(e.key === 'ArrowRight'){
      this.onRightClick(e)
    }
    else if(e.key === 'Backspace'){
      this.onBackspaceClick(e)
    }
    else if(e.key === 'Delete'){
      e.preventDefault()
      if(this.state.right.length>0){
        let r = emojiArray(this.state.right)
        r.shift()
        this.setState({right: r.join('')});
      }
    }
    else if(e.key == 'Enter'){
      this.onCommitClick(e)
    }
  }

  onRandomClick = (e) => {
    e.preventDefault()
    this.setState({left: randomPattern(),right:''});
  }

  onBackspaceClick = (e) => {
    e.preventDefault()
    if(this.state.left.length>0){
      let l = emojiArray(this.state.left)
      l.pop()
      this.setState({left: l.join('')})
    }
  }

  onBackspaceDown = (e) => {
    this.backspaceOn = Date.now()
  }

  onBackspaceUp = (e) => {
    const delta =  Date.now() - this.backspaceOn
    if(delta>700){
      this.setState({left: '', right:''})
    }
  }

  onLeftClick = (e) => {
    e.preventDefault()
    if(this.state.left.length>0){
      let l = emojiArray(this.state.left)
      const c = l.pop()
      this.setState({left: l.join(''), right: c + this.state.right });
    }
  }

  onRightClick = (e) => {
    e.preventDefault()
    if(this.state.right.length>0){
      let r = emojiArray(this.state.right)
      const c = r.shift()
      this.setState({left: this.state.left + c , right: r.join('') });
    }
  }

  commit = () => {
    const p = this.state.left+this.state.right
    reactLocalStorage.set('pattern', p)
    this.props.onCommit(p)
    this.setState({lastMsg: p});
  }

  render() {

    let carret = (<span className="carret"></span>)

    let hint = (<p className="hint">Hint: Throw a <a className="dice" href="/" onClick={this.onRandomClick}>🎲</a>
      <br/>Then hit <a href="/" onClick={this.onCommitClick}><FaUpload /></a> to send your pattern.</p>)
    if ( this.state.lastMsg){
      hint = (<p className="hint">Sent: {this.state.lastMsg}</p>)
    }

    return (
      <div className="play">
        {hint}
        <div className="input">
          <pre className="preview">{this.state.left}{carret}{this.state.right}</pre>
          <nav>
            <FaCaretLeft onClick={this.onLeftClick}/>
            <FaCaretRight onClick={this.onRightClick}/>
            <FaBackspace  onClick={this.onBackspaceClick} onMouseUp={this.onBackspaceUp} onMouseDown={this.onBackspaceDown} />
            <FaDice onClick={this.onRandomClick}/>
            <FaUpload onClick={this.onCommitClick}/>
          </nav>
        </div>
        <Picker style={{width:'100%',borderRadius:'0',border:0}} showPreview={false} emojiSize={36} native={true} onClick={this.addEmoji} i18n={i18nEmojis} recent={recentEmojis} custom={customEmojis} color="#222" include={includeEmojis}/>
      </div>
    )
  }
}

//And don't forget that the child will need this function declared in its propTypes:

Playground.propTypes = {
  onCommit: PropTypes.func.isRequired,
};

export default Playground
