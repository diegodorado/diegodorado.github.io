import React, {useState, useEffect,useRef,useContext} from "react"
import {BingoContext} from "./context"
import Context from "../../components/context"

const Chat = ({name,room}) => {
  const { state,dispatch} = useContext(BingoContext)
  const { state: globalState } = useContext(Context)

  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)


  useEffect(()=>{
    const service = globalState.api.service('bingo-chat')
    service.on('msg', data => {
      if(data.room ===room){
        setMessages(m => [...m,data])
        if(messagesRef.current)
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    })
  },[])

  const onKeyText = async  (e) => {
    if(e.key === 'Enter'){
      await sendText()
    }
  }

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const sendText = async () => {
    const service = globalState.api.service('bingo-chat')
    await service.patch(room,{name,text,room})
    setText('')
  }

  return (
    <div className="chat">
      <h5>CHAT</h5>
      <div ref={messagesRef} className="messages">
        {messages.map((m,i) => (
          <div key={i} className="message">
            <b>{m.name}:</b>{m.text}
          </div>
        ))}
      </div>
      <div className="send-box">
        <input type="text" placeholder="Escribir aquí" value={text} onChange={onChangeText} onKeyPress={onKeyText} />
        <button onClick={sendText}>ENVIAR</button>
      </div>
    </div>
  )
}

export default Chat
