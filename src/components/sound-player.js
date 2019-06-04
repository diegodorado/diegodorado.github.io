import React from "react"
import PropTypes from 'prop-types'

import { withSoundCloudAudio } from 'react-soundplayer/addons'
import { Timer } from 'react-soundplayer/components'
import { FaStepBackward,
         FaStepForward,
         FaPause,
         FaPlay,
         FaVolume,
         FaVolumeSlash,
        } from 'react-icons/fa'



class PlaylistSoundPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      muted: false,
      volume: 100,
    };
  }

  componentDidMount() {
   const { soundCloudAudio } = this.props
   soundCloudAudio.on('ended', this.onAudioEnded)
  }

  componentWillUnmount() {
   const { soundCloudAudio } = this.props
   soundCloudAudio.off('ended', this.onAudioEnded)
  }

  onAudioEnded= () => {
    this.next()
  }

  playTrackAtIndex(playlistIndex) {
    const { soundCloudAudio } = this.props;
    this.setState({activeIndex: playlistIndex});
    soundCloudAudio.play({ playlistIndex });
  }

  onPreviousClick = (e) =>{
    const { soundCloudAudio } = this.props;
    let { activeIndex } = this.state

    if (activeIndex === 0)
      return

    this.setState({activeIndex: --activeIndex})
    soundCloudAudio && soundCloudAudio.previous();

  }
  onPlayClick = (e) =>{
    const { playing, soundCloudAudio } = this.props;

    if (!playing) {
      soundCloudAudio && soundCloudAudio.play({
        playlistIndex: soundCloudAudio._playlistIndex
      })
    } else {
      soundCloudAudio && soundCloudAudio.pause()
    }

  }
  onNextClick = (e) =>{
    this.next()
  }

  next(){
    const { playlist, soundCloudAudio } = this.props;

    let { activeIndex } = this.state

    activeIndex++

    if (activeIndex > playlist.tracks.length - 1)
      activeIndex = 0

    this.setState({activeIndex: activeIndex})
    soundCloudAudio && soundCloudAudio.play({ playlistIndex: activeIndex })

  }

  onVolumeChange = (e) =>{
    const {soundCloudAudio} = this.props
    const volume = parseInt(e.target.value)
    const muted = (volume === 0)

    if (soundCloudAudio) {
      soundCloudAudio.audio.volume = (volume / 100)
      soundCloudAudio.audio.muted = muted
      this.setState({volume, muted})
    }
  }

  onMuteClick = (e) =>{
    const { soundCloudAudio } = this.props
    const muted = !this.state.muted
    if (soundCloudAudio){
      soundCloudAudio.audio.muted = muted
      this.setState({muted})
    }
  }




  onProgressClick = (e) =>{
    const { soundCloudAudio } = this.props
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth

    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration))
      soundCloudAudio.audio.currentTime = (xPos * soundCloudAudio.audio.duration)

  }


  renderTrackList() {
    const { playlist } = this.props

    if (!playlist)
      return <ul><li>Loading...</li></ul>

    const tracks = playlist.tracks.map((track, i) => {
      return (
        <li
          key={track.id}
          className={`${ (this.props.soundCloudAudio._playlistIndex === i ) ? 'active':''
          }`}
          onClick={this.playTrackAtIndex.bind(this, i)}>
            <span className="title">{track.title}</span>
            <span className="time">{Timer.prettyTime(track.duration / 1000)}</span>
        </li>
      );
    });

    return <ul>{tracks}</ul>
  }







  render() {
    const { playing, currentTime, duration } = this.props
    const progress = (currentTime / duration) * 100 || 0

    return (
      <div className="playlist-player">
        <nav>
          <FaStepBackward onClick={this.onPreviousClick}/>
          {playing ?
            <FaPause onClick={this.onPlayClick}/>
            :<FaPlay onClick={this.onPlayClick}/>}
          <FaStepForward onClick={this.onNextClick}/>
          <div className="volume">
            {this.state.muted ?
               <FaVolumeSlash onClick={this.onMuteClick} />
               : <FaVolume onClick={this.onMuteClick} />}
            <div className="volume-slider" >
              <input type="range" min="0" max="100" step="1" value={this.state.volume} onChange={this.onVolumeChange} />
            </div>
          </div>
          <div className="progress" onClick={this.onProgressClick}>
            <div className="inner" style={{width: `${progress}%`}} />
          </div>
          <span className="timer"> {Timer.prettyTime(currentTime)} / {Timer.prettyTime(duration || 0)} </span>
        </nav>
        {this.renderTrackList()}
      </div>
    );
  }


  static propTypes = {
    resolveUrl: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
  }


}



export default withSoundCloudAudio(PlaylistSoundPlayer)
