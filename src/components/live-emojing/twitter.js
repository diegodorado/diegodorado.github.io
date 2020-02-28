import React, {useState, useEffect} from "react"
import scheduler from './scheduler'
import Canvas from './canvas'
import {emojiArray} from './utils'
import parser from "./tidal"
import api from './twapi'
import { FaPlay,
         FaStop
        } from 'react-icons/fa'

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
      const text =  t[2]
      setPlaying(true)
      setCurrent(i)
      window.history.replaceState(null, null, `#${t[0]}`)
      try {
        scheduler.ensureSamples(emojiArray(text))
        let parsed = parser.parse(text)
        scheduler.play(parsed)
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

        {selected &&
          <div className="selected">
              @{selected[1]}: {selected[3]}
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
              @{t[1]}: {t[2]}
              {(current===i && playing) ?<FaStop/>:<FaPlay/>}

          </div>
        ))}
      </div>
    </div>
  )
}


export default Twitter
