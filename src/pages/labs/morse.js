import React, {useState} from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import morsify from "morsify"
import { FaPlay,
         FaShareAlt,
         FaPen,
        } from 'react-icons/fa'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => [c, morsify.encode(c)])

const timeouts = []

const getMessage = (location) => {
  const parts = location.hash.split('#')
  let t = null
  try{
    const u = JSON.parse(atob(decodeURIComponent(parts[1])))
    t = u
  }
  catch(e){}
  return t 
}

const MorseIndex = ({location}) => {
  const baseurl = () => location.href.replace(location.hash,"")
  const t = getMessage(location)
  const showInput = (t===null)

  const [text, setText] = useState((t===null)? 'escribe algo':t)
  const [audio, setAudio] = useState(null)
  const [pos, setPos] = useState(-1)
  const [copied, setCopied] = useState(false)



  const playAudio = (e) => {
    const a = morsify.audio(text,{ // generates the morse .- .-.. -... .-. .- --.- then generates the audio from it
      unit: 0.1, // period of one unit, in seconds, 1.2 / c where c is speed of transmission, in words per minute
      oscillator: {
        type: 'sine', // sine, square, sawtooth, triangle
        frequency: 330,  // value in hertz
        onended: () => stopAudio()
      }
    })
    a.play()

    let t = 0
    const chars = text.split('')
    for(let i=0; i<chars.length;i++){
      const to = setTimeout(()=>setPos(i),t)
      timeouts.push(to)
      if(chars[i]===' ')
        t += 1000
      else{
        const m = morsify.encode(chars[i])
        t += m.split('').reduce((a,c) => a + ( (c === '.')? 200 : 400),0)+300
      }
    }

    setAudio(a)
  }

  const stopAudio = (e) => {
    timeouts.forEach(t => clearTimeout(t))
    if(audio)
      audio.stop()
    setAudio(null)
    setPos(-1)
  }

  const onChange = (e) => {
    if(e.target.value.match("^[a-zA-Z ]*$") !== null){
      stopAudio()
      setText(e.target.value)
    }
  }

  const toggleAudio = () => {
    if(audio)
      stopAudio()
    else
      playAudio()
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      toggleAudio()
    }
  }

  const create = (e) => {
    window.location.href = baseurl()
  }

  const share = (e) => {

    const b64 = btoa(JSON.stringify(text))

    const dummy = document.createElement('input')
    const url = `${baseurl()}#${b64}`
    document.body.appendChild(dummy)
    dummy.value = url
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)

    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
      window.location.href = url
    },2500)

  }


  const title = showInput ? 'Generador de código MORSE' : 'Mensaje Cifrado'
  const text_arr = text.split('')
  const curr = (pos>=0) ? text_arr[pos] : null

  return (
    <Layout location={location} >
      <SEO title="morse" />
      <div className="morse">
        <div className={`clipboard ${copied?'visible':''}`}>
          ¡Enlace copiado al portapapeles!
        </div>
        <h3>{title}</h3>
        <div className="input">
          { showInput && <input type="text" value={text} onChange={onChange}  onKeyPress={onKeyPress} />}
        </div>
        <div className="output">
          <nav>
            {text_arr.map((c,i) => <span className={(i===pos)? 'current':''} key={i}>{(c===' ') ? ' ': `${morsify.encode(c)}` } </span>)}
            {'12345678'.split('').map((c,i) => <span key={i} className="fake"></span>)}
          </nav>
          <div className="letter" onClick={toggleAudio} >
            { !audio && <FaPlay/>}
            { curr && (curr===' ') ? '🤫' : curr}
          </div>
          <div className="actions"  >
            <button onClick={create}><FaPen/></button>
            <button onClick={share}><FaShareAlt/></button>
          </div>
        </div>
        <div className="hint">
          <h4>Tabla de códigos</h4>
          <nav>
            {alphabet.map(c => <span key={c[0]} className={((curr!==null) && curr.toUpperCase()===c[0])? 'current':''} >{c[0]}: {c[1]}   </span>)}
            {'12345678'.split('').map((c,i) => <span key={i} className="fake"></span>)}
          </nav>
        </div>
      </div>
    </Layout>
  )
}

export default MorseIndex
