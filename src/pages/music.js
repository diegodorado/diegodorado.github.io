import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans } from 'react-i18next'
//import prettyTime from '../components/prettyTime'

import { FaStepBackward,
         FaStepForward,
         FaPause,
         FaPlay,
         FaVolumeOff as FaVolumeOn,
         FaVolumeMute as FaVolumeOff } from 'react-icons/fa/index.esm.js'


//import SoundCloudAudio from 'soundcloud-audio'

const prettyTime = (time) => {return "00:00"}

const clientId = '802921cdc630a9a0d66f25c665703b8c'

const MusicIndex = ({ data, location }) => {
  const tracks = data.allSoundcloudtrack.edges
  const [player, setPlayer] = useState(null)
  const [index, setIndex] = useState(0)
  const [track, setTrack] = useState(tracks[0].node)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const toggle = (e) => {
    if (player.playing) {
      player.pause()
    } else {
      player.play({ streamUrl: track.stream_url})
    }
  }

  const prev = (e) =>{
    if(index>0)
      setIndex( i => i-1)
  }

  const next = (e) =>{
    if(index<tracks.length-1)
      setIndex( i => i+1)
  }

  const onProgressClick = (e) =>{
    //trigger play if not playing already
    if (!player.playing)
      player.play({ streamUrl: track.stream_url})

    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth
    const time = xPos*track.duration/1000
    player.setTime(time)
  }

  const onVolumeChange = (e) =>{
    const vol = parseInt(e.target.value)
    const mut = (vol === 0)
    player.audio.volume = (vol / 100)
    player.audio.muted = mut
    setVolume(vol)
    setMuted(mut)
  }

  const onMuteClick = (e) =>{
    const mut = (!muted)
    player.audio.muted = mut
    setMuted(mut)
  }

  useEffect(()=>{
    //setPlayer(new SoundCloudAudio(clientId))
  },[])

  useEffect(()=>{
    //do not run until player is set
    if(player===null)
      return

    player.on('ended', next)
    player.on('timeupdate', () => {
      setCurrentTime(player.audio.currentTime)
    })
    //cleanup
    return ()=>{
      player.stop()
      player.unbindAll()
      setPlayer(null)
    }
  },[player])


  useEffect(()=>{
    setTrack(tracks[index].node)

    //do not run until player is set
    if(player===null)
      return

    player.play({ streamUrl: tracks[index].node.stream_url})
  },[index])


  return (
    <Layout location={location} >
      <SEO title="music" />
      <p className="spacey">
        <Trans i18nKey="MusicIntro"
          components={[<a href="https://soundcloud.com/diego-dorado/tracks" target="_blank" rel="noopener noreferrer">soundcloud</a>]} />
      </p>
      <div className="playlist-player">
        <div className="track-details">
          <div className="details"  onClick={onProgressClick}>
            <div className="text">
              <h3>{track.title}</h3>
              <p>
                {track.description.split('\r\n').map( (l,i) =>(
                  <span key={i} >{l} <br/></span>
                ))}
                <em>{track.genre}</em><em>{track.tag_list}</em>
              </p>
            </div>
            <div className="progress">
              <div className="fill" style={{width: `${currentTime*1000*100/track.duration}%`}} />
              <div className="waveform" style={{backgroundImage: `url(${track.waveform_url})`}} />
            </div>
          </div>
          <div className="image" onClick={toggle}>
            <img src={track.artwork_url.replace('large.jpg','t300x300.jpg')} />
          </div>
        </div>
        <nav>
          <FaStepBackward onClick={prev}/>
          {player && player.playing ?
            <FaPause onClick={toggle}/>
            :<FaPlay onClick={toggle}/>}
          <FaStepForward onClick={next}/>
          {muted ?
             <FaVolumeOff onClick={onMuteClick} />
             : <FaVolumeOn onClick={onMuteClick} />}
          <div className="volume-slider" >
            <input type="range" min="0" max="100" step="1" value={muted? 0 : volume} onChange={onVolumeChange} />
          </div>
          <span className="timer"> {prettyTime(currentTime)}</span>
        </nav>
        <ul>
        {tracks.map(({ node },i) => {
            return (
              <li key={i} className={i===index?'active':''} onClick={() => setIndex(i)}>
                  <span className="title">{node.title}</span>
                  <span className="time">{prettyTime(node.duration / 1000)}</span>
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
