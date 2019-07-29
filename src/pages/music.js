import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans } from 'react-i18next'

import { FaVolumeOff} from 'react-icons/fa/index.esm.js'



const MusicIndex = ({ data, location }) => {
  const tracks = data.allSoundcloudtrack.edges
  const [index, setIndex] = useState(0)
  const [track, setTrack] = useState(tracks[0].node)

  useEffect(()=>{
    setTrack(tracks[index].node)
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
          <div className="details">
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
              <div className="fill" style={{width: `50%`}} />
              <div className="waveform" style={{backgroundImage: `url(${track.waveform_url})`}} />
            </div>
          </div>
          <div className="image" >
            <img src={track.artwork_url.replace('large.jpg','t300x300.jpg')} />
          </div>
        </div>
        <nav>
          <FaVolumeOff />
          <div className="volume-slider" >
            <input type="range" min="0" max="100" step="1" value="50" readOnly />
          </div>
          <span className="timer">00:00</span>
        </nav>
        <ul>
        {tracks.map(({ node },i) => {
            return (
              <li key={i} className={i===index?'active':''} onClick={() => setIndex(i)}>
                  <span className="title">{node.title}</span>
                  <span className="time">00:00</span>
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
