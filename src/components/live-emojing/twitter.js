import React, {useState, useEffect} from "react"
import scheduler from './scheduler'
import Canvas from './canvas'
import Link from "../link"
import api from './twapi'
import { FaPlay,
         FaStop
        } from 'react-icons/fa'
import twemoji from 'twemoji'
import { parse } from 'twemoji-parser'

const parseEmojis = (t) => twemoji.parse(t, {
  folder: 'svg',
  ext: '.svg'
})

const filterEmojis = (t) => parse(t).map(i => i.text).join('') 


const Twitter = ({id}) =>{

  const [current, setCurrent] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [tweets, setTweets] = useState([])
  useEffect(()=>{
    (async () => {
      try {
        scheduler.init()
        const ts = await api.readAll()
        const i = ts.findIndex((t,i) =>  t[0]===id)
        setCurrent(i)
        setTweets(ts)
      } catch (e) {
        console.log(e)
      }
    })()

    return () => {
      scheduler.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const play = (i) => {
    if(current===i && playing){
      scheduler.stop()
      setPlaying(false)
    }else{
      const t = tweets[i]
      setPlaying(true)
      setCurrent(i)
      window.history.replaceState(null, null, `#${t[0]}`)
      try {
	const entities = parse(t[2])
	const emojis = entities.map(i => i.text)
        scheduler.ensureSamples(emojis)
	// shitty parser
	const p = {type: 'group'}
	emojis.forEach((e,i)=> p[`${i}/${emojis.length}`] = {type:'emoji', value: e})
        scheduler.play(p)
      }
      catch(e) {
        console.log(e)
      }
    }
  }
  const selected = tweets.find((t,i) => current===i)

  return (
    <div className="twitter">
      <Canvas/>
      <p>
        Twiteá algunos 😛😍🔥😹 con el hastag #emojis y serán transformados por un bot.
        <br/>
        Mira como suenan estos tweets!
        <br/>
        O <Link to={`/labs/live-emojing/`}>prueba tu mismo tus emojis</Link>
      </p>
      {selected &&
        <div className="selected" >
          <span className="nick" >@{selected[1]}</span>
      	  <span className="emos" dangerouslySetInnerHTML={{__html:parseEmojis(selected[2])}}></span>
        </div>
      }
      <div className="tweets">
        {tweets.map((t,i) => (
          <div key={t[0]}
              className={`tweet ${(current===i) ? 'current':''}`}
              onClick={(e) => {
                e.preventDefault()
                play(i)
              }}>
		<span className="nick" >@{t[1]}</span>
		<span className="emos" dangerouslySetInnerHTML={{__html:parseEmojis(filterEmojis(t[2]))}}></span>
              {(current===i && playing) ?<FaStop/>:<FaPlay/>}

          </div>
        ))}
      </div>
    </div>
  )
}


export default Twitter
