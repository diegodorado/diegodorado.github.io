import React, {useContext} from "react"
import LiveEmojingContext from './context.js'
import Nick from './nick.js'
import Avatar from './avatar.js'
import Emoji from '../emoji.js'
import {FaEye,FaSignInAlt,FaPlay} from 'react-icons/fa'
import {useTranslation } from 'react-i18next'
import Link from "../link"

const Connection = () =>{

  const context = useContext(LiveEmojingContext)
  const [t, ] = useTranslation();


  return (
    <div className="connection">
      <p>Welcome to live coding with emojis! <Emoji emoji="😆" /> <em>(<Link to={'/works/live-emojing'}> + info about it</Link>)</em></p>
      <p>If there is an active live emojing channel, you can <strong>watch it</strong> or <strong>join it</strong> and be part of the session. Otherwise, you can just <strong>play alone</strong>.</p>
      <Avatar/>
      <Nick/>
      {context.connected ?
        (context.servers.length===0 ?
          <p><Emoji emoji="😢" /> Sadly, no live emojing channel was found...<em>You dont even need a nickname</em></p>
          :(<>
            {t('liveCodingSessions', {count:context.servers.length})}
            <p>When joining a channel, be sure to be also watching it on another window or device. {`Doesn't`} make much sense to send your emojis and without seeing them in action.</p>
            {context.servers.map(s =>
              <div className="channel" key={s.id}>
                <h3>"{s.channelName}" channel</h3>
                <button className="btn" onClick={(ev)=>context.joinChannel(s.channelName)}>join <FaSignInAlt/></button>
                {s.streamingUrl?
                  <a className="btn" href={s.streamingUrl} target="_blank" rel="noopener noreferrer">watch <FaEye/></a>:
                  <span><Emoji emoji="😞" /> no streaming url ...</span>
                }
              </div>)}
          </>))
      : <p> <Emoji emoji="😭" /> Cannot get channels list.</p>}
      <p>Want to play on your own? You can always do that:
      <button className="btn" onClick={(ev)=>context.playAlone()}>play alone <FaPlay/></button>
      </p>
    </div>
  )


}


export default Connection
