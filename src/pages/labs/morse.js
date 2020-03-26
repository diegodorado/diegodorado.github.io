import React, {useState, useEffect, useContext} from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import morsify from "morsify"
import { FaPlay,
         FaStop,
        } from 'react-icons/fa'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => [c, morsify.encode(c)])

const timeouts = []

const MorseIndex = ({location}) => {
  const parts = location.hash.split('#')
  const t= (parts.length >1) ? decodeURIComponent(parts[1]) : 'escribe algo'

  const [text, setText] = useState(t)
  const [audio, setAudio] = useState(null)
  const [pos, setPos] = useState(-1)

  const morse = morsify.encode(text)


  const playAudio = (e) => {
    const a = morsify.audio(text,{ // generates the morse .- .-.. -... .-. .- --.- then generates the audio from it
      unit: 0.1, // period of one unit, in seconds, 1.2 / c where c is speed of transmission, in words per minute
      oscillator: {
        type: 'sine', // sine, square, sawtooth, triangle
        frequency: 330,  // value in hertz
        onended: () => stopAudio()
      }
    },morse)
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
    setText(e.target.value)
  }

  const onKeyPress = (event) => {
    if(event.key === 'Enter'){
      if(audio)
        stopAudio()
      else
        playAudio()
    }
  }

  return (
    <Layout location={location} >
      <SEO title="morse" />
      <div className="morse">
        <h3>Generador de código MORSE</h3>
        <div className="input">
          <input type="text" value={text} onChange={onChange}  onKeyPress={onKeyPress} autoFocus />
          { !audio && <button onClick={playAudio} ><FaPlay/></button>}
          { audio && <button onClick={stopAudio} ><FaStop/></button>}
        </div>
        <div className="output">
          <nav>
            {text.split('').map((c,i) => <span className={(i===pos)? 'current':''} key={i}>{(c===' ') ? ' ': `${morsify.encode(c)}` } </span>)}
            {'12345'.split('').map((c,i) => <span key={i}></span>)}
          </nav>
          <div className="letter">
            {(pos>=0) && text.split('')[pos]}
          </div>
        </div>
        <div className="hint">
          <h4>Tabla de códigos</h4>
          {alphabet.map(c => <span key={c[0]}>{c[0]}: {c[1]}   </span>)}
        </div>
      </div>
    </Layout>
  )
}

export default MorseIndex
