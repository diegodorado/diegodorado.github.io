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
  const [muted, setMuted] = useState(false)

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
        const s = {
          throwingBall: {number,position, force}
        }
        if(!state.isClient)
          state.signalling.publish('state', {state:s})
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
      dispatch({type:'set-props', state:{throwingBall: null}})
    }
    return () => {}
  }, [state.throwingBall]) 

  const onCallClick = (e) => {
    dispatch({type:'set-props', state:{mayCall: false}})
    bingoRef.current.call()
  }

  const toggleMuted = (e) => {
    const m = !muted
    setMuted(m)
    pianoRef.current.muted=m
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
            <div className="buttons">
              <button onClick={toggleMuted}>{muted? <FaVolumeMute/> : <FaVolume/>}</button>
              {!state.isClient && automatic && state.playing && <button onClick={toggleAutoClick}>MANUAL</button>}
              {!state.isClient && !automatic && state.playing && state.mayCall && <button onClick={toggleAutoClick}>AUTO</button>}
              {!state.isClient && !automatic && state.playing && state.mayCall && <button onClick={onCallClick}>LANZAR</button>}
            </div>
          </div>
          )

}

const BingoWizard = () => {
  const { state,dispatch } = useContext(BingoContext)

  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const [notice, setNotice] = useState('')
  const playerNameRef = useRef(null)

  const onKeyPlayerName = (e) => {
    if(playerName.length>0 && e.key === 'Enter'){
      addPlayer()
    }
  }

  const onChangePlayerName = (e) => {
    setPlayerName(e.target.value)
  }
  
  const onChangeNumCards = (e) => {
    setNumCards(e.target.value)
  }

  const onAddPlayerClick = (e) => {
    if(playerName.length===0){
      playerNameRef.current.focus()
    }else{
      addPlayer()
    }
  }

  const addPlayer = () => {
    const peerId = uuidv4()
    const cards = []
    for(let i = 0; i< numCards; i++)
      cards.push(randomCard())
    const player = {connected:false,url:`${state.baseUrl}/${peerId}`,peerId,name:playerName,cards}
    dispatch({type: 'set-players', players: [...state.players, player]})
    setPlayerName('')
    copy2clip(player.url)
    setNotice(`Enlace copiado al portapapeles. Compartelo con ${player.name}.`)
    setTimeout(()=>{
      playerNameRef.current.focus()
    },100)
    setTimeout(()=>{
      setNotice('')
    },2000)
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

  const createSession = () => {
    dispatch({type:'set-props', state:{sessionReady: true}})
  }


  const handleFileChange = (ev) => {
    const file = ev.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader)
      const image = new Image()
      image.src = reader.result
      image.onload = () =>{
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext("2d")
        const w = 1000
        const h = 300
        const r = h/w
        canvas.width = w
        canvas.height = h
        const iw = image.width
        const ih = image.height
        const ir = ih/iw
        const hh = ir*w
        const ww = ir*h
        if(ir>r)
          ctx.drawImage(image, 0, (h-hh)*0.5, w,hh)
        else
          ctx.drawImage(image, (w-ww)*0.5, 0, ww,h)

        const dataURL = canvas.toDataURL("image/jpeg")

        dispatch({type:'set-props', state:{customHeader: dataURL }})
        console.log(image.width,image.height)
      }
    }

  }
  
  const onToggleChat = () => {
    dispatch({type:'set-props', state:{showChat: !state.showChat }})
  }

  const onToggleJitsi = () => {
    dispatch({type:'set-props', state:{showJitsi: !state.showJitsi }})
  }


  useEffect(()=>{
    if(state.sessionReady){
      setTimeout( ()=>{  
        playerNameRef.current.focus()
        playerNameRef.current.scrollIntoView()
      }, 1000)
    }
    return () => {}
  },[state.sessionReady])


  return state.sessionReady ?
    (
      <div className="setup">
        <button className="filepicker">
          CAMBIAR ENCABEZADO
          <input type="file" onChange={handleFileChange} multiple={false} accept={"image/png, image/jpeg"} />
        </button>
        <button onClick={onToggleChat}>{state.showChat ? 'OCULTAR CHAT' : 'MOSTRAR CHAT'}</button>
        <button onClick={onToggleJitsi}>{state.showJitsi ? 'OCULTAR JITSI' : 'MOSTRAR JITSI'}</button>

        <h4>Participantes</h4>
        {state.players.length === 0 ?
          <p>Aún no hay participantes en la partida.</p>
          : <p>Hay {state.players.length} participantes en la partida. </p>
        }
        <div className="input-box">
          <input ref={playerNameRef} type="text" placeholder="Participante" value={playerName} onChange={onChangePlayerName} onKeyPress={onKeyPlayerName} />
          <select value={numCards} onChange={onChangeNumCards} >
            {[1,2,3,4,5].map(n => {
              return <option key={n} value={n}>{(n===1) ? '1 cartón' : `${n} cartones`}</option>
            })}
          </select>
          <button onClick={onAddPlayerClick}>Agregar</button>
          { notice.length>0 && <div className="notice">{notice}</div>}
        </div>
        {state.players.length === 0 ?
          <p>Una vez que inicies la partida, ya no podrás agregar participantes.</p>
          :  <button onClick={onStartClick}>EMPEZAR</button>
        }
        {(state.players.length>0) &&
          <>
            <table>
              <thead>
                <tr>
                  <th>Participante</th>
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
    :(
      <div className="setup">
        <h4>Bienvenido/a</h4>
        <p>Esto es un BINGO con videoconferencia, aunque también ¡es un juego musical!</p>
        <div>
          <button onClick={createSession}>Crear una partida de BINGO</button>
          <button onClick={onHereForMusic}>¡Solo vine por la música!</button>
        </div>
      </div>
    )

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
  players: [],
  balls: [],
  messages: [],
  rollingBall: null,
  throwingBall: null,
  signalling:null,
  customHeader: '',
  showCanvas: true,
  showChat: true,
  showJitsi: true,

}

const reducer = (state, action) => {
  switch (action.type) {
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
    case 'client-connected': {
      const peerId = action.peerId
      const {players,balls, messages,loading,playing} = state
      const s = {players,balls,loading,playing}
      state.signalling.publish('state', {state:s, toPeerId:peerId})
      players.forEach(p =>{
        if(p.peerId === peerId)
          p.connected = true
      })
      return {...state, players}
    }
    case 'client-closed': {
      const peerId = action.peerId
      const {players} = state
      players.forEach(p =>{
        if(p.peerId === peerId)
          p.connected = false
      })
      return {...state, players}
    }
    case "send-text":{
      const {text,peerId,fromMaster} = action
      const player = state.players.filter(p => p.peerId===peerId)[0]
      const user = player ? player.name : (fromMaster? 'Anfitrión': 'Anonimus')
      return {...state, messages:[...state.messages,{text,user}]}
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
      init({isClient:false,session: d[0], peerId:d[1]})
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
        session: state.session,
        sessionReady: state.sessionReady,
        peerId: state.peerId,
        players: state.players,
        balls: state.balls,
        messages: state.messages,
        playing: state.playing,
      }
      reactLocalStorage.setObject('last-bingo-session',s)
    }
    return () => {}
  },[state.playing,state.sessionReady,state.balls,state.messages,state.session,state.peerId,state.players])

  useEffect(()=>{
    if(initilized && !state.isClient){
      // only care for master sessions
      const s = {
        players: state.players,
        balls: state.balls,
        playing: state.playing,
        sessionReady: state.sessionReady,
      }
      state.signalling.publish('state', {state:s})
    }
    return () => {}
  },[state.playing,state.sessionReady,state.balls,state.players])

  const newSession = () => {
    reactLocalStorage.setObject('last-bingo-session',null)
    init({isClient:false,session: uuidv4(), peerId:uuidv4()})
  }

  const recoverSession = () => {
    const s = reactLocalStorage.getObject('last-bingo-session')
    s.isClient = false
    init(s)
  }

  const init = (s) => {
    const baseurl = location.href.replace(location.hash,"").replace('#','')
    s.loading = false
    s.baseUrl = `${baseurl}#${s.session}`
    s.signalling = new Signalling (s.isClient, s.session,s.peerId,dispatch)
    if(s.players)
      s.players.forEach(p=> p.connected=false)
    dispatch({ type: "set-props", state: s})
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
    this.connected = false

    const ws = new WebSocket(wsUrl)
    ws.onopen = () => {
      this.connected = true
      if(isClient){
        this.subscribe(['chat','state','master-joined'])
        this.publish('client-joined')
      }else{
        this.subscribe(['chat','client-joined'])
        this.publish('master-joined')
      }
    }
    ws.onclose = () => {
      console.log('disconnected')
    }
    ws.onmessage = ({data}) => {
      const msg = JSON.parse(data)
      switch(msg.type){
        case 'publish':
          const {toPeerId,peerId,data,fromMaster} = msg

          if(toPeerId && toPeerId!==this.peerId)
            return

          const topic = msg.topic.split('/')[1]
          switch (topic) {
            case 'client-joined':
              dispatch({type: 'client-connected', peerId})
              break
            case 'master-joined':
              break
            case 'chat':
              const {text} = data
              dispatch({type: 'send-text', text,peerId,fromMaster})
              break
            case 'state':
              const {state} = data
              dispatch({type: 'set-props', state})
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
    if(!this.connected)
      return

    const msg = JSON.stringify({data, type: "publish", fromMaster: !this.isClient, peerId: this.peerId, topic:`${this.channelName}/${topic}`})
    this.ws.send(msg)
  }

  subscribe(topics) {
    const msg = JSON.stringify({type: "subscribe", topics: topics.map(t => `${this.channelName}/${t}`)})
    this.ws.send(msg)
  }

  sendMessage(text){
    this.publish('chat', {text})
  }

}

const BingoIndex = ({location}) => {
  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <BingoProvider > 
        <BingoInner location={location}/>
      </BingoProvider>
    </Layout>
  )
}

const VideoConference = () => {
  const jitsiContainerId = "jitsi-container-id"
  const [initilized, setInitialized] = useState(false)
  const [jitsi, setJitsi] = useState()
  const { state} = useContext(BingoContext)

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null

    const loadJitsiScriptPromise = new Promise(resolve => {
      resolveLoadJitsiScriptPromise = resolve
    })

    const script = document.createElement("script")
    script.src = "https://meet.jit.si/external_api.js"
    script.async = true
    script.onload = () => resolveLoadJitsiScriptPromise(true)
    document.body.appendChild(script)

    return loadJitsiScriptPromise
  };

  const initialiseJitsi = async (player) => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript()
    }

    const videoMuted = state.isClient

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName:`bingo-${state.session}`,
      parentNode: document.getElementById(jitsiContainerId),
      configOverwrite: { 
        startWithAudioMuted: true,
        disableInviteFunctions: true,
        disableDeepLinking: true,
        disableRemoteMute: true,
        defaultLanguage: 'es',
        //displayJids: true,
        // Every participant after the Nth will start video muted.
        startVideoMuted: 10,
        // Start calls with video muted. Unlike the option above, this one is only
        // applied locally. FIXME: having these 2 options is confusing.
        startWithVideoMuted: videoMuted,
        // Every participant after the Nth will start audio muted.
        startAudioMuted: 10,
        enableTalkWhileMuted: false,
      },
      interfaceConfigOverwrite: { 
        HIDE_INVITE_MORE_HEADER: true,
        DEFAULT_BACKGROUND: '#222222',
        SHOW_CHROME_EXTENSION_BANNER: false,
        //SHOW_JITSI_WATERMARK: false,
        MOBILE_APP_PROMO: false,
        SETTINGS_SECTIONS: [ 'devices'],
        //SHOW_BRAND_WATERMARK: false,
        TOOLBAR_BUTTONS: [
            'microphone', 'camera', 
            'settings',
            'videoquality', 'filmstrip', 
            'tileview', 
        ],
      },
    })

    _jitsi.executeCommand('displayName', player ? player.name : 'Anfitrión')
    _jitsi.executeCommand('subject', 'Bingo Musical')
    _jitsi.executeCommand('avatarUrl', `https://api.adorable.io/avatars/200/${state.peerId}`)

    setJitsi(_jitsi)
  }

  useEffect(() => {

    if(initilized)
      return

    const player = state.players.filter(p => p.peerId ===state.peerId)[0]

    if(state.session && ((!state.isClient && state.sessionReady) || player)){
      initialiseJitsi(player);
      setInitialized(true)
    }

    return () => jitsi && jitsi.dispose()
  }, [state.players,state.session,state.isClient,state.peerId,state.sessionReady])

  return <div className={`video ${jitsi? 'jitsi':'hidden'}`} id={jitsiContainerId} />
};


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

  return (
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

const BingoHeader = () => {
  const heading = 'BINGO'.split('')
  const { state} = useContext(BingoContext)
  const headingIdx = state.rollingBall ? Math.floor(state.rollingBall/15) : null
  return (
    <div className={`header`} style={{backgroundImage:`url(${state.customHeader})`}}>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{state.rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
    </div>
  )
}

const BingoInner = ({location}) => {
  const { state} = useContext(BingoContext)

  const player = state.players.filter(p => p.peerId ===state.peerId)[0]

  // single layout for master and clients
  return (
    <div className={`bingo ${state.onlyMusic ? 'only-music' :  ''}`}>
      <BingoHeader />
      <BingoSession location={location}/>
      { !state.loading && ( 
        <>
          <div className="game">
            <div className="main">
              {(!state.isClient || state.showCanvas) && <BingoCanvas />}
              {!state.isClient && <BingoBalls />}
            </div>
            <div className="aside">
              {state.isClient ?
                (player && !state.playing &&
                  <p>
                    {`¡Hola ${player.name}! Estamos calentando motores. En breve comienza la partida.`} 
                  </p>
                )
                :
                ( state.playing ? <BingoRanking/> : <BingoWizard/> )
              }
              {state.showChat && <BingoChat />}
              {state.showJitsi && <VideoConference />}
              {state.isClient && <BingoBalls />}
            </div>
          </div>
          {player && player.cards.map((c,i)=> <Card key={i} card={c} />) }
        </>
      ) }
    </div>
  )
}

export default BingoIndex
