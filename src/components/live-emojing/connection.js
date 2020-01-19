import React, {useContext} from "react"
import LiveEmojingContext from './context.js'
import Nick from './nick.js'
import Avatar from './avatar.js'
import Emoji from '../emoji.js'
import {FaSignInAlt,FaPlay} from 'react-icons/fa'
import {useTranslation } from 'react-i18next'

const Connection = () =>{

  const context = useContext(LiveEmojingContext)
  const [t, ] = useTranslation();

  return (
    <div className="connection">
      <p>{t('Make music with emojis!')} <Emoji emoji="😆" /></p>
      <Nick/>
      <Avatar/>
      {context.connected ?
        (context.servers.length===0 ?
          <p><Emoji emoji="😢" /> {t('So sad... there are no active session')}</p>
          :(<>
            {t('liveCodingSessions', {count:context.servers.length})}
            {context.servers.map(s =>
              <div className="channel" key={s.id}>
                <h3>"{s.channelName}" channel</h3>
                <button className="btn" onClick={(ev)=>context.joinChannel(s.channelName)}>{t('join')} <FaSignInAlt/></button>
                {/*s.streamingUrl?
                  <a className="btn" href={s.streamingUrl} target="_blank" rel="noopener noreferrer">watch <FaEye/></a>:
                  <span><Emoji emoji="😞" /> no streaming url ...</span>
                */}
              </div>)}
          </>))
      : <p> <Emoji emoji="😭" /> {t('Cannot get channels list')}.</p>}
      <p>{t('Want to play on your own?')}
      <br/>
      <button className="btn" onClick={(ev)=>context.playAlone()}>{t('play alone')} <FaPlay/></button>
      </p>
    </div>
  )


}


export default Connection
