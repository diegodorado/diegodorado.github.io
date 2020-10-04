import React, {useState, useEffect,useRef} from "react"
import Context from "../../components/context"
import useBingo from "./useBingo"

const Chat = ({name,room}) => {
  const [text, setText] = useState('')
  const messagesRef = useRef(null)
  const {messages, sendText} = useBingo(room)

  useEffect(()=>{
    if(messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  },[messages])

  const onKeyText = async  (e) => {
    if(e.key === 'Enter'){
      await submit()
    }
  }

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const submit = async () => {
    //send
    sendText({name,text})
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
        <button onClick={submit}>ENVIAR</button>
      </div>
    </div>
  )
}

export default Chat
