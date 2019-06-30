import React, { useState, useEffect } from 'react';
import LiveEmojingContext from './context.js'
import simpleDDP from 'simpleddp'
import ws from 'isomorphic-ws'

const opts = {
    // endpoint: "wss://av.thundernize.com/websocket",
    endpoint: "ws://localhost:3000/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000
}

let ddp = null


const LiveEmojingStore = ({children}) => {

  const [connected, setConnected] = useState(false)
  const [lastMsg, setLastMsg] = useState('')
  const [nick, setNick] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [pattern, setPattern] = useState('')
  const [servers, setServers] = useState([])
  const [channel, setChannel] = useState('')
  const [playingAlone, setPlayingAlone] = useState(false)
  const [configuring, setConfiguring] = useState(true)

  //this will observe for active servers
  const connectAsync = async  () =>{
    try {
      setConnected(false)
      ddp = new simpleDDP(opts)
      ddp.on('disconnected', () => setConnected(false))
      await ddp.connect()
      setConnected(true)
      const sub = ddp.subscribe('emojis.servers')
      await sub.ready()
      const serversCollection = ddp.collection('servers').reactive()
      setServers(s=> s.filter(i => false).concat( serversCollection.data()))
      serversCollection.onChange((data)=>{
        setServers(s=> s.filter(i => false).concat(data))
      })
    } catch (error) {
      console.log('error!', error)
      setConnected(false)
    }
  }

  useEffect(() => {
    connectAsync()
  }, [])

  const toggleConfiguring = (ev)=>{
    ev.preventDefault()
    setConfiguring(!configuring)
  }

  const playAlone = ()=>{
    setPlayingAlone(true)
    setConfiguring(false)
  }

  const joinChannel = (channel)=>{
    setPlayingAlone(false)
    setConfiguring(false)
    setChannel(channel)
  }

  const sendPattern = ()=>{
    ddp.call('emojis.send',channel, {nick,pattern})
  }

  return (
    <LiveEmojingContext.Provider value={{connected,nick,pattern,servers,joinChannel, setNick, sendPattern, avatarUrl, setAvatarUrl,toggleConfiguring,configuring,playAlone,playingAlone}}>
      {children}
    </LiveEmojingContext.Provider>
  )

}

export default LiveEmojingStore
