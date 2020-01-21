import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans } from 'react-i18next'
import prettyTime from '../components/prettyTime'
import BandcampPlayer from 'react-bandcamp'


import { FaStepBackward,
         FaStepForward,
         FaPause,
         FaPlay,
         FaVolumeDown as FaVolumeOn,
         FaVolumeMute as FaVolumeOff } from 'react-icons/fa/index.esm.js'

//todo: make the player a widget for the site ... or not

//todo: move to some env file
const clientId = '802921cdc630a9a0d66f25c665703b8c'
let audio = null

const ascii =  `
                    ╔═╗    
                    ║↑║    
                    ╚═╝    
╔═════════════╗  ╔═╗╔═╗╔═╗ 
║  SPACE BAR  ║  ║←║║↓║║→║ 
╚═════════════╝  ╚═╝╚═╝╚═╝ 
`


const MusicIndex = ({ data, location }) => {


  const tracks = data.allSoundcloudtrack.edges.map(t => t.node)
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const play = () => {
    const playPromise = audio.play()
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise === undefined) {
      setPlaying(true)
    }else{
      playPromise
        .then(() => setPlaying(true))
        .catch( (error)  => console.log(error))
    }

  }

  const pause = () => {
    audio.pause()
    setPlaying(false)
  }

  const toggle = () => playing ? pause() : play()
  const prev = () => setIndex( i => (i>0 ? i-1 : tracks.length-1))
  const next = () => setIndex( i => (i<tracks.length-1 ? i+1: 0))



  const seek = (dir) =>{
    //trigger play if not playing already
    if (!playing){
      play()
      return
    }

    if (!audio.readyState)
      return

    const delta = tracks[index].duration/1000/10
    audio.currentTime += delta*dir
  }

  const onProgressClick = (e) =>{
    //trigger play if not playing already
    if (!playing){
      play()
      return
    }

    if (!audio.readyState)
      return

    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth
    const time = xPos*tracks[index].duration/1000
    audio.currentTime = time
  }

  const onVolumeChange = (e) =>{
    if (!audio.readyState)
      return

    const vol = parseInt(e.target.value)
    const mut = (vol === 0)
    audio.volume = (vol / 100)
    audio.muted = mut
    setVolume(vol)
    setMuted(mut)
  }

  const onMuteClick = (e) =>{
    if (!audio.readyState)
      return

    const mut = (!muted)
    audio.muted = mut
    setMuted(mut)
  }

  const audioTimeUpdate = _ => setCurrentTime(audio.currentTime)

  useEffect(()=>{
    audio = new Audio()
    audio.addEventListener('ended', next)
    audio.addEventListener('timeupdate',audioTimeUpdate)

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', prev)
      navigator.mediaSession.setActionHandler('nexttrack', next)
      navigator.mediaSession.setActionHandler('play', play)
      navigator.mediaSession.setActionHandler('pause', pause)
    }

    //cleanup
    return ()=>{
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('previoustrack', null)
        navigator.mediaSession.setActionHandler('nexttrack', null)
        navigator.mediaSession.setActionHandler('play', null)
        navigator.mediaSession.setActionHandler('pause', null)
      }

      audio.pause()
      audio.removeEventListener('ended', next)
      audio.removeEventListener('timeupdate',audioTimeUpdate)
      audio = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(!audio)
      return

    const first_run = (audio.src==='')
    audio.src = `${tracks[index].stream_url}?client_id=${clientId}`

    if ('mediaSession' in navigator) {
      /*global MediaMetadata*/
      /*eslint no-undef: "error"*/
      navigator.mediaSession.metadata = new MediaMetadata({
        title: tracks[index].title,
        artist: 'Diego Dorado',
        album: 'Music',
        artwork: [
          { src: tracks[index].artwork_url.replace('large.jpg','t500x500.jpg')}
        ]
      });
    }

    if(!first_run)
      play()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[index])


  useEffect(()=>{
    //re-attach listener if left, right or error have changed
    window.addEventListener('keydown', onKeyPress)
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('keydown', onKeyPress)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[index, playing])



  const onKeyPress = (e) => {
    const c = e.key.toLowerCase()
    if(c === ' '  || c === 'enter')
      toggle()
    else if(c === 'arrowleft')
      seek(-1)
    else if(c === 'arrowright')
      seek(1)
    else if(c === 'arrowup')
      prev()
    else if(c === 'arrowdown')
      next()
    else
      return

    e.preventDefault()
  }


  return (
    <Layout location={location} >
      <SEO title="music" />
{/*
      <BandcampPlayer album="1868484386" width='350px' height='700px' bgcol='000' />
      <BandcampPlayer album="1868484386" width='350px' height='700px' bgcol='ff5500' />
      <BandcampPlayer album="1868484386" width='350px' height='700px' bgcol='ff5500' />
      <BandcampPlayer album="1868484386" width='350px' height='700px' bgcol='ff5500' />
      */}






      <p className="spacey">
        <Trans i18nKey="MusicIntro"
          components={[<a href="https://soundcloud.com/diego-dorado/tracks" target="_blank" rel="noopener noreferrer">soundcloud</a>]} />
      </p>
      <pre className="ascii-keyboard">{ascii}</pre>

      <div className="playlist-player">
        <div className="track-details">
          <div className="details"  onClick={onProgressClick} aria-hidden="true">
            <div className="text">
              <h3><span>{tracks[index].title}</span></h3>
              <p>
                {tracks[index].description.split('\r\n').map( (l,i) =>(
                  <span key={i} >{l} <br/></span>
                ))}
                <em>{tracks[index].genre}</em><em>{tracks[index].tag_list}</em>
              </p>
            </div>
            <div className="progress">
              <div className="fill" style={{width: `${currentTime*1000*100/tracks[index].duration}%`}} />
              <div className="waveform" style={{backgroundImage: `url(${tracks[index].waveform_url})`}} />
            </div>
          </div>
          <div className="image">
            <img alt="artwork" src={tracks[index].artwork_url.replace('large.jpg','t500x500.jpg')} />
          </div>
        </div>
        <nav>
          <FaStepBackward onClick={prev}/>
          {playing ?
            <FaPause onClick={pause}/>
            :<FaPlay onClick={play}/>}
          <FaStepForward onClick={next}/>
          {muted ?
             <FaVolumeOff className="mute" onClick={onMuteClick} />
             : <FaVolumeOn className="mute" onClick={onMuteClick} />}
          <div className="volume-slider" >
            <input type="range" min="0" max="100" step="1" value={muted? 0 : volume} onChange={onVolumeChange} />
          </div>
          <span className="timer"> {prettyTime(currentTime)}</span>
        </nav>
        <ul>
        {tracks.map((t,i) => {
            return (
              <li key={i} className={i===index?'active':''} onClick={() => setIndex(i)} aria-hidden="true" >
                  <span className="title">{t.title}</span>
                  <span className="time">{prettyTime(t.duration / 1000)}</span>
              </li>
            )
          })}
        </ul>
      </div>


    </Layout>
  )
}

export default MusicIndex

export const pageQuery = graphql`
  query {
    allSoundcloudtrack(sort:{fields:created_at, order:DESC} ) {
      edges {
        node {
          title
          description
          artwork_url
          waveform_url
          duration
          genre
          stream_url
          created_at
          tag_list
        }
      }
    }
  }
`
