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
      <p>{t('live code with emojis!')}<Emoji emoji="😆" /></p>
      <Avatar/>
      <Nick/>
      {context.connected ?
        (context.servers.length===0 ?
          <p><Emoji emoji="😢" /> {t('So sad... no active live emojing session')}</p>
          :(<>
            {t('liveCodingSessions', {count:context.servers.length})}
            {context.servers.map(s =>
              <div className="channel" key={s.id}>
                <h3>"{s.channelName}" channel</h3>
                <button className="btn" onClick={(ev)=>context.joinChannel(s.channelName)}>join <FaSignInAlt/></button>
                {/*s.streamingUrl?
                  <a className="btn" href={s.streamingUrl} target="_blank" rel="noopener noreferrer">watch <FaEye/></a>:
                  <span><Emoji emoji="😞" /> no streaming url ...</span>
                */}
              </div>)}
          </>))
      : <p> <Emoji emoji="😭" /> {t('Cannot get channels list')}.</p>}
      <p>{t('Want to play on your own? You can always do that')}:
      <button className="btn" onClick={(ev)=>context.playAlone()}>{t('play alone')} <FaPlay/></button>
      </p>
    </div>
  )


}


export default Connection
