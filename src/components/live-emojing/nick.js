import React, {useState, useEffect, useContext} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import LiveEmojingContext from './context.js'

const Nick = () =>{

  const context = useContext(LiveEmojingContext)
  const [valid, setValid] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [understandsNameClick, setUnderstandsNameClick] = useState(false)

  useEffect(()=>{
    const nick = reactLocalStorage.get('nick', 'funky-duck')
    if(nick!==''){
      context.setNick(nick)
      setValid(true)
      setConfirmed(true)
    }

    const understands = (reactLocalStorage.get('understandsNameClick', 'false')==='true')
    setUnderstandsNameClick(understands)
  },[])

  const onChange = (e) => {
    context.setNick(e.target.value)
    setValid(e.target.validity.valid)
  }

  const handleFocus = (event) => event.target.select()

  const onChangeClick = (e) => {
    e.preventDefault()
    setConfirmed(false)
    //hides help and save setting
    reactLocalStorage.set('understandsNameClick', true)
    setUnderstandsNameClick(true)
  }

  const confirm = () => {
    if(valid){
      reactLocalStorage.set('nick', context.nick)
      setConfirmed(true)
    }
  }

  const onKeyPress = (event) => {
    if(event.key === 'Enter'){
      confirm()
    }
  }

  return (
    <>
      {confirmed?
        (<p><em>Hey</em> <a href="/" onClick={onChangeClick}>{context.nick}</a> ! {(!understandsNameClick)?<span> {'<--- '} Click the name to change it </span>:null}</p>):
        (<input type="text" value={context.nick} onChange={onChange} onBlur={confirm} autoFocus required pattern="^[A-Za-z0-9_-]{3,15}$" onKeyPress={onKeyPress} onFocus={handleFocus} size={15} maxLength={15}/>)
      }
    </>
  )

}

export default Nick
