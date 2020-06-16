/* eslint-disable jsx-a11y/control-has-associated-label */ 
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions  */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {useState, useEffect,useRef,useContext,useReducer} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import Bingo from "../../components/bingo/bingo"
import {startPiano} from "../../components/bingo/piano"
import { FaShareAlt,
         FaEye,
         FaTrashAlt,
         FaVolumeMute,
         FaVolumeDown as FaVolume,
        } from 'react-icons/fa'

import Peer from 'simple-peer'
import { v4 as uuidv4 } from 'uuid'
import WebSocket from 'isomorphic-ws'

const wsUrl = 'wss://flok-hub.herokuapp.com/signal'

const BingoContext = React.createContext()

const copy2clip = (text) => {
  const dummy = document.createElement('input')
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}

const copyLink = (url,el) => {
  copy2clip(url)
  el.classList.add('copied')
  setTimeout(()=>{
    el.classList.remove('copied')
  },1000)
}

const shuffle = (b) => {
  const a = [...b]
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomCard = ()=>{
  const c = []
  // select which cells have data
  for(let i=0;i<3;i++)
    c.push(shuffle([1,1,1,1,1,0,0,0,0]))

  for(let i=0;i<9;i++){
    let numbers = [...Array(9).keys()].map(x => i*10 + x).filter(x => x!==0)
    if(i===8)
      numbers.push(90)

    // select 3 random numbers, sorted
    numbers = shuffle(numbers).slice(0,3).sort()

    for(let j=0;j<3;j++)
      if(c[j][i])
        c[j][i] = numbers[j]
  }

  return c
}

const BingoRanking = () => {
  const { state } = useContext(BingoContext)

  const ranking = state.players.reduce( (arr, p) => {
    return [...arr, ...p.cards.map((c,i) => {
      const countHits =  (a,x) => (state.balls.includes(x)?1:0)+a
      const hits = c.map(r => r.reduce(countHits,0) ).reduce( (a,x) => x+a, 0)
      return {
        name: p.name,
        card: `#${i+1}`,
        url: p.url,
        connected: p.connected,
        hits 
      }
    })]
  },[]).sort( (a,b) => b.hits-a.hits)
        
  return state.players.length>0 && (
      <table>
        <thead>
          <tr>
            <th>Participante</th>
            <th>Cartón</th>
            <th>Puntos</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ranking.map( (r,i) => 
              (
                <tr key={i}>
                  <td className={`player ${r.connected ? 'connected' :''}`}>{r.name}</td>
                  <td>{r.card}</td>
                  <td>{r.hits}</td>
                  <td className="action" onClick={(ev)=>copyLink(r.url,ev.currentTarget)} ><FaShareAlt /></td>
                  <td className="action"><a href={r.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                </tr>
              )
          )}
          <tr>
            <td>Link General</td>
            <td></td>
            <td></td>
            <td className="action" onClick={(ev)=>copyLink(state.baseUrl,ev.currentTarget)} ><FaShareAlt /></td>
            <td className="action"><a href={state.baseUrl} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
            <td></td>
          </tr>
        </tbody>
      </table>
  )

}

const BingoBalls = () => {
  const { state } = useContext(BingoContext)
  return state.balls.length>0 &&
            (<div className="balls">
              {state.balls.map((b,i) => <span key={i} className={b===state.rollingBall? 'rolling' : ''}>{b}</span>)}
            </div>)
}

const BingoCanvas = () => {
  const { state,dispatch } = useContext(BingoContext)

  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)
  const pianoRef = useRef(null)
  const [automatic, setAutomatic] = useState(false)

  useEffect(() => {

    (async () => {
      pianoRef.current = await startPiano()
    })()

    const draw = time => {
      const bingo = bingoRef.current
      rafRef.current = requestAnimationFrame(draw)
      bingo.update()
    }

    const onBingoStatusChanged = (status,number, position, force) => {
      if(status===2)
        pianoRef.current.playStart()
      if(status===3){
        state.signalling.broadcast({throwingBall: {number,position, force}})
      }
      if(status===4){
        dispatch({type:'set-props', state:{rollingBall: number}})
        pianoRef.current.playEnd()
        bingoRef.current.complete()
        dispatch({type:'add-ball', ball: number})
        setTimeout( ()=> {
          dispatch({type:'set-props', state:{rollingBall: null, mayCall: true}})
          if(bingoRef.current.automatic)
            bingoRef.current.call()
        },2000)
      }
    }

    const onCollisionBall = () => pianoRef.current.playRandomNote()
    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged, onCollisionBall)
    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

  useEffect(() => {
    if(state.playing){
      const remaining = [...Array(90).keys()].map(x => x+1).filter(x=> !state.balls.includes(x))
      bingoRef.current.start(remaining)
    }
    return () => {}
  }, [state.playing]) 

  useEffect(() => {
    if(state.throwingBall){
      const {number,force,position} = state.throwingBall
      bingoRef.current.throwByNumber(number,position, force)
    }
    return () => {}
  }, [state.throwingBall]) 

  const onCallClick = (e) => {
    dispatch({type:'set-props', state:{mayCall: false}})
    bingoRef.current.call()
  }

  const toggleAutoClick = (e) => {
    if(automatic){
      setAutomatic(false)
      bingoRef.current.automatic=false
    }else{
      setAutomatic(true)
      bingoRef.current.automatic=true
      onCallClick()
    }
  }

  return (
          <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600} />
            {!state.isClient && (
            <div className="buttons">
              {automatic && state.playing && <button onClick={toggleAutoClick}>MANUAL</button>}
              {!automatic && state.playing && state.mayCall && <button onClick={toggleAutoClick}>AUTO</button>}
              {!automatic && state.playing && state.mayCall && <button onClick={onCallClick}>LANZAR</button>}
            </div>)}
          </div>
          )

}

const getCameraStream = async () => {
  const constraints = {
    video: {width: {exact: 320}, height: {exact: 240}},
    audio: true,
  }
  try{
    // create the master stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return stream
  }catch (e){
    console.log(e)
  }
}

const BingoWizard = () => {
  const { state,dispatch } = useContext(BingoContext)

  const [step, setStep] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)

  const onKeyPlayerName = (e) => {
    if(e.key === 'Enter'){
      addPlayer()
    }
  }

  const onChangePlayerName = (e) => {
    setPlayerName(e.target.value)
  }
  
  const onPasteChannelID = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text')
    e.preventDefault()
    dispatch({type: 'set-channel-id', channelID:paste})
  }
  
  const onChangeNumCards = (e) => {
    setNumCards(e.target.value)
  }

  const addPlayer = () => {
    const peerId = uuidv4()
    const cards = []
    for(let i = 0; i< numCards; i++)
      cards.push(randomCard())
    const player = {connected:false,url:`${state.baseUrl}/${peerId}`,peerId,name:playerName,cards}
    dispatch({type: 'set-players', players: [...state.players, player]})
    setPlayerName('')
  }

  const removePlayer = (i) => {
    dispatch({type: 'set-players', players: state.players.filter( (p,j) => i!==j)})
  }

  const onStartClick = (e) => {
    dispatch({type:'set-props', state:{playing: true}})
  }

  const onHereForMusic = (e) => {
    dispatch({type:'set-props', state:{onlyMusic: true,playing: true}})
  }

  const sessionReady = () => {
    setStep(5)
    state.signalling.sessionReady(state.stream)
    dispatch({type: 'session-ready'})
  }

  const cancelYoutube = () => {
    setStep(2)
    dispatch({type: 'set-channel-id', channelID:null})
  }

  const setupWebcam = () => {
    getCamera()
    setStep(3)
  }

  const setupYoutube = () => {
    setStep(4)
  }

  const getCamera = async () => {
    const stream = await getCameraStream()
    dispatch({type: 'set-stream', stream})
    reactLocalStorage.set('bingo-camera-on', '1')
  }

  const stopCamera = () => {
    if(state.stream)
      state.stream.getTracks().forEach( t => t.stop() )
    reactLocalStorage.set('bingo-camera-on', '0')
    dispatch({type: 'set-stream', stream:null})
    setStep(2)
  }

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="setup">
            <h4>Bienvenido/a</h4>
            <p>Esto es un BINGO, pero tambien es un juego musical!</p>
            <div>
              <button onClick={()=> setStep(2)}>Crear Partida de BINGO</button>
              <button onClick={onHereForMusic}>¡Solo vine por la música!</button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="setup">
            <h4>Comparte Video</h4>
            <p>Sos el GameMaster, el anfitrión de la partida. ¿Cómo prefieres compartir tu video?</p>
            <p>Para una configuración sencilla, compartí la webcam. Para conectar muchas personas, es preferible compartir desde youtube.</p>
            <button onClick={setupWebcam}>Compartir Webcam</button>
            <button onClick={setupYoutube}>Compartir desde youtube</button>
            <button onClick={sessionReady}>No compartir video</button>
          </div>
        )
      case 3:
        return (
          <div className="setup">
            <h4>Cámara Web</h4>
            <p>Los demás participantes verán tu cámara.</p>
            { state.stream && <button onClick={sessionReady}>Siguiente</button>}
            <button onClick={stopCamera}>Cancelar</button>
          </div>
        )
      case 4:
        return (
          <div className="setup">
            <h4>Youtube</h4>
            {!state.channelID &&
              <>
                <p>Para que vean tu live de youtube, pegá acá tu channelID, que encontrás en <a href="https://www.youtube.com/account_advanced" target="_blank" rel="noopener noreferrer">youtube.com/account_advanced</a> </p>
                <div className="input-box">
                  <input type="text" placeholder="YOUR_CHANNEL_ID" onPaste={onPasteChannelID} />
                </div>
              </>
            }
            { state.channelID && <button onClick={sessionReady}>Siguiente</button>}
            <button onClick={cancelYoutube}>Cancelar</button>
          </div>
        )
      case 5:
        return (
          <div className="setup">
            <p>Ingresa el nombre del participante y presiona ENTER para sumarlo a la partida.</p>
            <p>Podés asignarle más de un cartón. </p>
            {state.players.length > 0 && <button onClick={onStartClick}>EMPEZAR</button>}
            <div className="input-box">
              <input type="text" placeholder="Nombre" value={playerName} onChange={onChangePlayerName} onKeyPress={onKeyPlayerName} />
              <input type="number" min={1} max={5} value={numCards} onChange={onChangeNumCards} />
            </div>
            {(state.players.length>0) &&
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cartones</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.players.map( (p,i) => {
                      return (
                        <tr key={i}>
                          <td className={`player ${p.connected ? 'connected' :''}`}>{p.name}</td>
                          <td>{p.cards.length}</td>
                          <td className="action" onClick={(ev)=>copyLink(p.url,ev.currentTarget)} ><FaShareAlt /></td>
                          <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                          <td className="action" onClick={(ev)=>removePlayer(i)} ><FaTrashAlt/></td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td>Link General</td>
                      <td></td>
                      <td className="action" onClick={(ev)=>copyLink(state.baseUrl,ev.currentTarget)} ><FaShareAlt /></td>
                      <td className="action"><a href={state.baseUrl} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  <li><FaShareAlt/> copia el enlace para compartir</li>
                  <li><FaEye/> previsualiza el enlace</li>
                  <li><FaTrashAlt/> quita un participante</li>
                </ul>
              </>
            }
          </div>
        )
      default:
        return null
    }
  }

  return renderStep()

}

const Card = ({card}) => {
  //const { state } = useContext(BingoContext)
  const [marks, setMarks] = useState([])
  
  const onCellClick = (c) => {
    if(c>0){
      if(marks.includes(c))
        setMarks(marks.filter(x => x!==c))
      else
        setMarks([...marks, c])
    }
  }

  return (
    <div className="card">
      {card.map((row,i)=>{
        return (
          <div key={i} className="row">
          {row.map((c,j) => {
             return (
               <div 
                 key={j}
                 className={` cell ${marks.includes(c)? 'marked' : ''} ${(c===0)? 'free' : ''}`}
                 onClick={()=> onCellClick(c)}
                 >
                  <svg viewBox="0 0 10 10">
                    <text x="5" y="6.66">{c}</text>
                  </svg>
               </div>
             )
            }
          )}
        </div>
        )
      })}
    </div>
  )
}

const BingoPlayerList = () => {
  const { state} = useContext(BingoContext)
  return (
    <table>
      <thead>
        <tr>
          <th>Participante</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {state.players.filter(p => !p.connected).map( (p,i) => 
            (
              <tr key={i}>
                <td className={`player`}>{p.name}</td>
                <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
              </tr>
            )
        )}
      </tbody>
    </table>
  )
}

const getData = (location) => {
  const parts = location.hash.split('#')
  let d = null
  try{
    d = parts[1].split('/')
  }
  catch(e){}
  return d 
}

const initialState = {
  isClient: false,
  sessionReady: false,
  loading: true,
  onlyMusic : false,
  mayCall: true,
  playing: false,
  session: null,
  peerId: uuidv4(),
  baseUrl: null,
  stream: null,
  channelID: null,
  players: [],
  messages: [],
  balls: [],
  rollingBall: null,
  throwingBall: null,
  signalling:null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, ...action.state }
    case "set-props":
      return { ...state, ...action.state }
    case "add-ball":
      const ball = action.ball
      // do not duplicate balls, due to remote update
      if(state.balls.includes(ball))
        return state
      else
        return {...state, balls:[ball, ...state.balls]}
    case "set-players":
      const players = action.players
      return {...state, players}
    case "set-stream":
      const stream = action.stream
      return {...state, stream}
    case "set-channel-id":
      const channelID = action.channelID
      return {...state, channelID}
    case "session-ready":
      return {...state, sessionReady:true}
    case "send-text":
      const {text,peerId,fromMaster} = action
      const player = state.players.filter(p => p.peerId===peerId)[0]
      const user = player ? player.name : (fromMaster? 'Anfitrión': 'Anonimus')
      return {...state, messages:[...state.messages,{text,user}]}
    case 'peer-connected': {
      const peer = action.peer
      const peerId = action.peerId
      const {messages,players, balls, playing, rollingBall,channelID} = state
      players.forEach(p =>{
        if(p.peerId === peerId)
          p.connected = true
      })
      const s =  {messages,players, balls, playing, rollingBall,channelID}
      const msg = JSON.stringify(s)
      peer.send(msg)
      return {...state, players}
    }
    case 'peer-closed': {
      const peerId = action.peerId
      const {players} = state
      players.forEach(p =>{
        if(p.peerId === peerId)
          p.connected = false
      })
      return {...state, players}
    }
    default:
      console.log(action)
      throw new Error()
  }
}

const BingoProvider = ({children}) =>{
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <BingoContext.Provider value={value}>
      {children}
    </BingoContext.Provider>
  )
}

const BingoSession = ({location}) =>{
  //todo: make signalling a session ref rather than global state

  const { state,dispatch} = useContext(BingoContext)
  const [initilized, setInitialized] = useState(false)

  useEffect(()=>{
    const d = getData(location)
    if(d){
      // got data from hash
      init(true,d[0],d[1])
    }else{
      const last = reactLocalStorage.getObject('last-bingo-session',null)
      if(!last)
        newSession()
    }
    return () => {}
  },[location])

  // save session on local storage
  useEffect(()=>{
    if(initilized && !state.isClient){
      // only care for master sessions
      const s = {
        isClient: state.isClient,
        channelID: state.channelID,
        messages: state.messages,
        session: state.session,
        peerId: state.peerId,
        players: state.players,
        balls: state.balls,
        loading: state.loading,
        playing: state.playing,
        sessionReady: state.sessionReady,
      }
      reactLocalStorage.setObject('last-bingo-session',s)
    }
    return () => {}
  },[state.sessionReady,state.playing,state.loading,state.balls,state.channelID,state.messages,state.session,state.isClient,state.peerId,state.players])

  //get Camera early
  useEffect(()=>{
    const on = reactLocalStorage.get('bingo-camera-on', '0')
    if(!state.stream && on==='1'){
      getCameraStream().then(stream => {
        dispatch({type: 'set-stream', stream})
      })
    }
  },[state.stream])


  const init = (isClient, session, peerId) => {
    const baseurl = location.href.replace(location.hash,"").replace('#','')
    const baseUrl = `${baseurl}#${session}`
    const loading = false
    const signalling = new Signalling (isClient, session,peerId,dispatch)
    const s = {isClient,session,peerId,baseUrl,loading,signalling}
    dispatch({ type: "initialize", state: s})
    setInitialized(true)
  }

  const newSession = () => {
    reactLocalStorage.setObject('last-bingo-session',null)
    init(false,uuidv4(),uuidv4())
  }

  const recoverSession = () => {
    const s = reactLocalStorage.getObject('last-bingo-session')
    const {isClient, session, peerId,sessionReady} = s
    s.signalling = new Signalling (isClient, session,peerId,dispatch)
    if(sessionReady){
      s.signalling.onOpen = () => {
        s.signalling.sessionReady(state.stream)
      }
    }
    if(s.players)
      s.players.forEach(p=> p.connected=false)
    dispatch({ type: "initialize", state: s})
    setInitialized(true)
  }

  return !initilized && (
    <>
      <p>Se encontró una sesión previa. ¿Desea recuperarla?</p>
      <button onClick={recoverSession} >Si, por favor </button>
      <button onClick={newSession} >No, gracias</button>
    </>
  )
}





class Signalling {
  // use dispatch if you need an updated state version
  constructor(isClient, session,peerId,dispatch){

    this.channelName= `bingo-${session}`
    this.peerId =  peerId
    this.isClient = isClient

    this.master = null
    this.peers =  new Map()
    this.stream = null
    this.onOpen = () => {}

    const createMasterPeer = () => {
      const peer = new Peer( {
        initiator: true,
      })
      peer.on('signal', data => {
        this.publish('client-signal', {signalData:data})
      })
      peer.on('data', data => {
        const state = JSON.parse(data)
        dispatch({type: 'set-props', state})
      })
      peer.on('stream', stream => {
        dispatch({type: 'set-stream', stream})
      })
      peer.on('connect', () => {
        console.log('connected')
      })
      this.master = peer
    }

    const addClientPeer = (peerId,signalData) => {
      const peer = new Peer( {
        initiator: false,
        stream: this.stream
      })
      peer.on('signal', data => {
        this.publish('master-signal', {signalData:data,peerId})
      })
      peer.on('connect', () => {
        console.log('connected',peerId)
        dispatch({type: 'peer-connected',peerId, peer})
      })
      peer.on('close', () => {
        console.log('closed',peerId)
        this.peers.delete(peerId)
        dispatch({type: 'peer-closed',peerId})
      })
      peer.on('error', () => {
        console.log('error',peerId)
      })
      peer.signal(signalData)
      this.peers.set(peerId,peer)
    }

    const ws = new WebSocket(wsUrl)
    ws.onopen = () => {
      this.onOpen()
      this.subscribe(['chat'])
      if(isClient){
        this.subscribe(['master-signal','master-joined'])
        // the client kicks the connection
        createMasterPeer()
      }
    }
    ws.onclose = () => {
      console.log('disconnected')
    }
    ws.onmessage = ({data}) => {
      const msg = JSON.parse(data)
      switch(msg.type){
        case 'publish':
          const {peerId,data,fromMaster} = msg
          const topic = msg.topic.split('/')[1]
          switch (topic) {
            case 'client-signal':
              const p = this.peers.get(peerId)
              if(p && !p.destroyed){
                p.signal(data.signalData)
              }else{
                addClientPeer(peerId,data.signalData)
              }
              break
            case 'master-joined':
              //master just joined ... recreate
              createMasterPeer()
              break
            case 'master-signal':
              // got master signal data
              if(this.master && !this.master.destroyed && data.peerId===this.peerId)
                this.master.signal(data.signalData)
              break
            case 'chat':
              const {text} = data
              dispatch({type: 'send-text', text,peerId,fromMaster})
              break

            default:
              console.error('unexpected topic', topic)
          }
          break

        default:
          console.error('unexpected message' ,msg)
          break
      }
    }
    this.ws = ws
  }

  publish(topic, data){
    const msg = JSON.stringify({data, type: "publish", fromMaster: !this.isClient, peerId: this.peerId, topic:`${this.channelName}/${topic}`})
    this.ws.send(msg)
  }

  subscribe(topics) {
    const msg = JSON.stringify({type: "subscribe", topics: topics.map(t => `${this.channelName}/${t}`)})
    this.ws.send(msg)
    console.log(topics)
  }

  sessionReady(stream){
    this.stream = stream
    this.subscribe(['client-signal'])
    this.publish('master-joined')
  }

  sendMessage(text){
    this.publish('chat', {text})
  }


  broadcast(data) {
    this.peers.forEach(p =>{
      if(p && !p.destroyed && p.connected){
        const msg = JSON.stringify(data)
        p.send(msg)
      }
    })
  }

}

const Video = () => {
  const { state} = useContext(BingoContext)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)
  const youtubeUrl = (channelID) => channelID.length ? `https://www.youtube.com/embed/live_stream?channel=${channelID}` : null

  useEffect(()=>{
    if(state.stream)
      videoRef.current.srcObject = state.stream
  },[state.stream])

  const toggleMuted = () => {
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  const hasVideo = state.channelID || state.stream

  return hasVideo && (
    <div className={'video'}>
      {state.channelID ?
        <iframe title="youtube channel" width="400" height="300" src={youtubeUrl(state.channelID)}></iframe>
        :
        <>
          <video ref={videoRef} onClick={toggleMuted} playsInline muted autoPlay> </video>
          {muted ? <FaVolumeMute /> : <FaVolume /> }
        </>
      }
    </div>
  )
}

const BingoIndex = ({location}) => {
  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <BingoProvider > 
        <BingoSession location={location}/>
        <BingoInner/>
      </BingoProvider>
    </Layout>
  )
}

const BingoChat = () => {
  const { state,dispatch} = useContext(BingoContext)

  const [text, setText] = useState('')
  const messagesRef = useRef(null)

  useEffect(()=>{
    if(messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  },[state.messages])

  const onKeyText = (e) => {
    if(e.key === 'Enter'){
      sendText()
    }
  }

  const onChangeText = (e) => {
    setText(e.target.value)
  }
  
  const sendText = () => {
    state.signalling.sendMessage(text)
    setText('')
  }

  return state.players.length>0 &&  (
    <div className="chat">
      <h5>CHAT</h5>
      <div ref={messagesRef} className="messages">
        {state.messages.map((m,i) => (
          <div key={i} className="message">
            <b>{m.user}:</b>{m.text}
          </div>
        ))}
      </div>
      <div className="send-box">
        <input type="text" placeholder="Escribir aquí" value={text} onChange={onChangeText} onKeyPress={onKeyText} />
        <button onClick={sendText}>ENVIAR</button>
      </div>
    </div>
  )
}

const heading = 'BINGO'.split('')
const BingoInner = () => {
  const { state} = useContext(BingoContext)

  const headingIdx = state.rollingBall ? Math.floor(state.rollingBall/15) : null
  const player = state.players.filter(p => p.peerId ===state.peerId)[0]

  useEffect(()=>{
    if(state.signalling)
      state.signalling.broadcast({players: state.players })
  },[state.signalling,state.players])

  useEffect(()=>{
    if(state.signalling)
      state.signalling.broadcast({balls: state.balls })
  },[state.signalling,state.balls])


  useEffect(()=>{
    if(state.signalling)
      state.signalling.broadcast({playing: state.playing })
  },[state.signalling,state.playing])

  // single layout for master and clients

  return (
    <div className={`bingo ${state.onlyMusic ? 'only-music' :  ''}`}>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{state.rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
      { !state.loading && ( 
        <>
          <div className="game">
            <div className="main">
              <BingoCanvas />
              <BingoBalls />
            </div>
            <div className="aside">
              <Video />
              {state.isClient ?
                (player ?
                  (!state.playing &&
                    <p>
                      {`¡Hola ${player.name}! Estamos calentando motores. En breve comienza la partida. 
                         Aquí veras las bolillas a medida que vayan saliendo.`} 
                      { state.stream && ' A la derecha podrás ver la cámara del anfitrión'}
                    </p>
                  )
                  :
                  <BingoPlayerList/>
                )
                :
                ( state.playing ? <BingoRanking/> : <BingoWizard/> )
              }
              <BingoChat/>
            </div>
          </div>
          {player && player.cards.map((c,i)=> <Card key={i} card={c} />) }
        </>
      ) }
    </div>
  )
}

export default BingoIndex
