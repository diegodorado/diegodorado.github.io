import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans } from 'react-i18next'

import { withCustomAudio } from 'react-soundplayer/addons';
import { Timer } from 'react-soundplayer/components'
import { FaStepBackward,
         FaStepForward,
         FaPause,
         FaPlay,
         FaVolume,
         FaVolumeSlash,
        } from 'react-icons/fa'
import SoundCloudAudio from 'soundcloud-audio'


const clientId = '802921cdc630a9a0d66f25c665703b8c'
const scPlayer = new SoundCloudAudio(clientId)

const MusicIndex = ({ data, location }) => {
  const tracks = data.allSoundcloudtrack.edges

  const [index, setIndex] = useState(0)
  const [track, setTrack] = useState(tracks[0].node)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const toggle = (e) => {
    if (scPlayer.playing) {
      scPlayer.pause()
    } else {
      scPlayer.play({ streamUrl: track.stream_url})
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
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth
    const time = xPos*track.duration/1000
    scPlayer.setTime(time)
  }

  const onVolumeChange = (e) =>{
    const vol = parseInt(e.target.value)
    const mut = (vol === 0)
    scPlayer.audio.volume = (vol / 100)
    scPlayer.audio.muted = mut
    setVolume(vol)
    setMuted(mut)
  }

  const onMuteClick = (e) =>{
    const mut = (!muted)
    scPlayer.audio.muted = mut
    setMuted(mut)
  }


  useEffect(()=>{
    setTrack(tracks[index].node)
    scPlayer.play({ streamUrl: tracks[index].node.stream_url})
  },[index])


  useEffect(()=>{
    scPlayer.on('ended', next)
    scPlayer.on('timeupdate', () => {
      setCurrentTime(scPlayer.audio.currentTime)
    })
    //cleanup
    return ()=>{scPlayer.unbindAll()}
  },[])



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
                {track.description.split('\r\n').map(l =>(
                  <>
                  <span>{l}</span>
                  <br/>
                  </>
                ))}
                <em>{track.genre}</em><em>{track.tag_list}</em>
              </p>
            </div>
            <div className="progress">
              <div className="fill" style={{width: `${currentTime*1000*100/track.duration}%`}} />
              <div className="waveform" style={{backgroundImage: `url(${track.waveform_url})`}} />
            </div>
          </div>
          <div className="image">
            <img src={track.artwork_url.replace('large.jpg','t300x300.jpg')} />
          </div>
        </div>
        <nav>
          <FaStepBackward onClick={prev}/>
          {scPlayer.playing ?
            <FaPause onClick={toggle}/>
            :<FaPlay onClick={toggle}/>}
          <FaStepForward onClick={next}/>
          {muted ?
             <FaVolumeSlash onClick={onMuteClick} />
             : <FaVolume onClick={onMuteClick} />}
          <div className="volume-slider" >
            <input type="range" min="0" max="100" step="1" value={muted? 0 : volume} onChange={onVolumeChange} />
          </div>
          <span className="timer"> {Timer.prettyTime(currentTime)}</span>
        </nav>
        <ul>
        {tracks.map(({ node },i) => {
            return (
              <li key={i} className={i===index?'active':''} onClick={() => setIndex(i)}>
                  <span className="title">{node.title}</span>
                  <span className="time">{Timer.prettyTime(node.duration / 1000)}</span>
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
