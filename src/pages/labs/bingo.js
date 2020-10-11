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
         FaCog,
        } from 'react-icons/fa'
import {navigate } from "gatsby"

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

const random75Card = ()=>{
  const c = []
  const first15 = [...Array(15).keys()]
  for(let i=0;i<5;i++){
    let col  = first15.map(a => (15*i)+a+1)
    col = shuffle(col)
    col = col.slice(0,5)
    col = col.sort( (a,b) => a-b )
    if(i===2)
      col[2]=0
    c.push(col)
  }
  //transpose
  return c[0].map((_, i) => c.map(r => r[i]))
}

const random90Card = ()=>{
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

const BingoPlayers = () => {
  const { state, dispatch } = useContext(BingoContext)

  const [playerName, setPlayerName] = useState('')
  const [editable, setEditable] = useState(true)
  const [numCards, setNumCards] = useState(1)
  const [notice, setNotice] = useState('')
  const playerNameRef = useRef(null)

  const addPlayer = () => {
    const peerId = uuidv4()
    const cards = []
    for(let i = 0; i< numCards; i++){
      cards.push( state.config.style === 'bingo90' ? random90Card() : random75Card())
    }
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

  const onAddPlayerClick = () => {
    if(playerName.length===0){
      playerNameRef.current.focus()
    }else{
      addPlayer()
    }
  }

  const onToggleEdit = () => {
    setEditable(!editable)
  }

  const onStartGame = () => {
    setEditable(false)
    dispatch({type: 'restart-game'})
  }

  const onFinishGame = () => {
    dispatch({type: 'finish-game'})
  }

  // get players and cards ranking
  const rank = state.players.map(p => {
    const countHits =  (a,x) => (state.balls.includes(x)?1:0)+a
    const rowsFinished = (a,x) => (x===5?1:0)+a
    const sumAll = (a,x) => x+a
    const cards = p.cards.map((c,j) => {
      const rowHits = c.map(r => r.reduce(countHits,0))
      const hits = rowHits.reduce(sumAll, 0)
      const rows = rowHits.reduce(rowsFinished,0)
      return {
        card: j+1,
        hits ,
        rows
      }
    }).sort( (a,b) => b.hits-a.hits)
    const best = cards[0].hits
    return {
      name: p.name, 
      url: p.url,
      connected: p.connected,
      best, 
      cards}
  }).sort( (a,b) => b.best-a.best)
        
  return state.sessionReady && (
    <>
     {editable && 
       (
         <>
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
         </>
       )
     }
     {state.players.length>0 &&
       (<>
          <table>
            <thead>
              <tr>
                <th>Participante</th>
                <th></th>
                <th>Aciertos</th>
                <th>Líneas</th>
                {editable && 
                  <>
                    <th></th>
                    <th></th>
                    <th></th>
                  </>
                }
              </tr>
            </thead>
            <tbody>
              {rank.map( (p,i) => 
                  (
                    <React.Fragment key={i}>
                      {p.cards.map( (c,j) => 
                          (
                            <tr key={`${i}-${j}`}>
                              {j===0 ? 
                                <td className={`player ${p.connected ? 'connected' :''}`}>{p.name}</td>
                                :
                                <td></td>
                              }
                              <td>#{c.card}</td>
                              <td>{c.hits}</td>
                              <td>{c.rows}</td>
                              {editable && (j===0 ? 
                                <>
                                  <td className="action" onClick={(ev)=>copyLink(p.url,ev.currentTarget)} ><FaShareAlt /></td>
                                  <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                                  <td className="action" onClick={()=>removePlayer(i)} ><FaTrashAlt/></td>
                                </>
                                :
                                <>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </>
                              )}
                            </tr>
                          )
                      )}
                    </React.Fragment>
                  )
              )}

            </tbody>
          </table>
          {editable && 
            <ul>
              <li><FaShareAlt/> copia el enlace para compartir</li>
              <li><FaEye/> previsualiza el enlace</li>
              <li><FaTrashAlt/> quita un participante</li>
            </ul>
          }
        </>)
     }
      <button className={editable?'on':''} onClick={onToggleEdit}>EDITAR</button>
      {editable && state.playing && <button onClick={onFinishGame}>FINALIZAR PARTIDA</button>}
      {editable && !state.playing && <button onClick={onStartGame}>COMENZAR PARTIDA</button>}
      <br/>
      <br/>
    </>)

}

const BingoBalls = ({reversed}) => {
  const { state } = useContext(BingoContext)
  return  state.balls.length>0 &&
            (<div className="balls">
              {(reversed ? state.balls.reverse() :state.balls).map((b,i) => <span key={i} className={b===state.rollingBall? 'rolling' : ''}>{b}</span>)}
            </div>)
}

const BingoCanvas = () => {
  const { state,dispatch } = useContext(BingoContext)

  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)
  const pianoRef = useRef(null)
  const [configOpen, setConfigOpen] = useState(false)

  useEffect(() => {

    //todo: async wrapper uselles unless i need something after
    //fixme: pianoRef may be null on some callbacks
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
        if(pianoRef.current)
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
        if(pianoRef.current)
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

    const onCollisionBall = () => {
      if(pianoRef.current)
        pianoRef.current.playRandomNote()
    }
    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged, onCollisionBall)
    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

  useEffect(() => {
    console.log(`state.playing changed to ${state.playing}`)
    if(state.playing){
      const allNums = [...Array((state.config.style === 'bingo90' ? 90 : 75)).keys()]
      const remaining = allNums.map(x => x+1).filter(x=> !state.balls.includes(x))
      bingoRef.current.start(remaining)
    }
  }, [state.playing]) 

  useEffect(() => {
    if(state.throwingBall){
      const {number,force,position} = state.throwingBall
      bingoRef.current.throw(number,position, force)
      dispatch({type:'set-props', state:{throwingBall: null}})
    }
  }, [state.throwingBall]) 

  useEffect(() => {
    if(pianoRef.current){
      pianoRef.current.muted=!state.config.pianoOn
      pianoRef.current.setScale(state.config.pianoScale)

    }
    if(bingoRef.current){
      bingoRef.current.automatic=state.config.autoCall
      bingoRef.current.setVfxLevel(state.config.vfx)
      if(state.config.autoCall)
        onCallClick()
    }
  }, [state.config]) 

  const onCallClick = () => {
    dispatch({type:'set-props', state:{mayCall: false}})
    bingoRef.current.call()
  }

  const toggleConfig = () => {
    setConfigOpen(!configOpen)
  }

  return (
          <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600} />
            <div className="buttons">
              {configOpen && <BingoConfig />}
              {!state.isClient && !state.config.autoCall && state.playing && state.mayCall && <button onClick={onCallClick}>LANZAR</button>}
              <button className={configOpen?'on':''} onClick={toggleConfig}>{configOpen? <FaCog/> : <FaCog/>}</button>
            </div>
          </div>
          )

}

const BingoConfig = () => {
  const { state,dispatch } = useContext(BingoContext)
  const config = state.config

  const changeConfig = (cfg) => {
    dispatch({type:'set-config', config:cfg})
  }

  const onToggleChat = () => {
    changeConfig({showChat: !config.showChat })
  }

  const onToggleJitsi = () => {
    changeConfig({showJitsi: !config.showJitsi })
  }

  const onTogglePiano = () => {
    changeConfig({pianoOn: !config.pianoOn })
  }

  const onClickPianoScale = () => {
    const nextScale = (config.pianoScale+1)%4
    changeConfig({pianoScale: nextScale })
  }

  const onToggleAutomatic = () => {
    changeConfig({autoCall: !config.autoCall })
  }

  const onClickVfx = () => {
    const nextVfx = (config.vfx+1)%4
    changeConfig({vfx:nextVfx})
  }


  return (
          <div className="config">
            {!state.isClient && state.playing && (
              <button onClick={onToggleAutomatic}>{config.autoCall ? 'AUTOMATIC' : 'MANUAL'}</button>
            )}
            <button className={config.pianoOn ? 'on':''} onClick={onTogglePiano}>{config.pianoOn ? 'MUSIC ON':'MUSIC OFF'}</button>
            {config.pianoOn && 
              <button onClick={onClickPianoScale}>{` ${['PENTATONIC','DORIAN','ONIRIC','ARABIC'][config.pianoScale]}`}</button>
            }
            <button className={config.vfx!==0 ? 'on':''} onClick={onClickVfx}>{`VFX ${['OFF','LOW','MID','HIGH'][config.vfx]}`}</button>
            {!state.onlyMusic && (
              <>
                <button className={config.showChat ? 'on':''} onClick={onToggleChat}>{`CHAT ${config.showChat ? 'ON':'OFF'}`}</button>
                <button className={config.showJitsi ? 'on':''} onClick={onToggleJitsi}>{`VIDEO ${config.showJitsi ? 'ON':'OFF'}`}</button>
              </>
            )}
          </div>
  )

}

const FaqItem = ({startOpen=false,question,children}) => {
  const [open, setOpen] = useState(startOpen)

  const onToggle = () => {
    setOpen(!open)
  }

  return (
            <li onClick={onToggle}>
              <strong>{question}</strong>
              {open && children}
            </li>)

}

const BingoFaq = () => {
  const { state } = useContext(BingoContext)

  return !state.isClient && !state.playing && !state.sessionReady &&
    (
        <div className="faq">
          <h4>¿Cómo funciona?</h4>
          <iframe style={{width:'100%',height:'54vw',maxWidth:'560px',maxHeight:'315px'}}  src="https://www.youtube.com/embed/5xx1J1WPK-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br/>
          <br/>
          <br/>
          <h4>Preguntas Frecuentes</h4>
          <br/>
          <ul>
            <FaqItem startOpen={true} question="¿Puedo usar el BINGO con la gente de mi escuela / club / organización / familia ?">
              <p>¡Por supuesto!, cualquiera puede usar este BINGO.</p>
            </FaqItem>
            <FaqItem question="¿Cómo funciona?">
              <p>Una persona es el ANFITRIÓN, y suma a la partida a tantos jugadores como desee.
              <br/>
              El ANFITRIÓN es quien crea la partida, asigna cartones a los participantes, y lleva adelante la partida.</p>
            </FaqItem>
            <FaqItem question="¿Tiene costo?">
              <p>No, no tiene costo.</p>
            </FaqItem>
            <FaqItem question="¿Cómo creo una partida?">
              <p>
                1) Hacer click en el botón "CREAR UNA PARTIDA".
                <br/>
                2) Indicar los nombres de los participantes y cantidad de  cartones.
                <br/>
                3) Enviar a cada participante su enlace.
                <br/>
                4) Dar comienzo a la partida.
                <br/>
                <br/>
                Los participantes reciben los números que salen a medida que saques bolillas.
              </p>
            </FaqItem>
            <FaqItem question="¿Cómo reparto los cartones?">
              <p>
                Deberás enviar el enlace de cada participante por el medio que te parezca:  email / whatsapp / red-social.
                <br/>
                Tip: luego de agregar un participante el enlace queda en tu portapapeles.
              </p>
            </FaqItem>
            <FaqItem question="¿Puedo vender los cartones para recaudar fondos?">
              <p>Puedes hacerlo, pero deberás gestionar los cobros por tu cuenta. Este BINGO no administra cobros.</p>
            </FaqItem>
            <FaqItem question="¿Cómo sé cuando alguien gana?">
              <p>Es tarea del ANFITRIÓN ir mirando el ranking de aciertos de la partida.</p>
            </FaqItem>
            <FaqItem question="¿Cuantos participantes admite?">
              <p>No hay un límite definido y sé que se ha jugado de hasta 100 participantes. Se recomienda desactivar la opción de videoconferencia si van a ser mas de 20.</p>
            </FaqItem>
            <FaqItem question="¿Se puede jugar desde el teléfono?">
              <p>Si. Pero en el caso del ANFITRIÓN es preferible que utilice una computadora.</p>
            </FaqItem>
            <FaqItem question="¿Qué pasa si se cierra el navegador en medio de la partida?">
              <p>Si hubo una sesión anterior el BINGO propondrá recuperarla.</p>
            </FaqItem>
            <FaqItem question="¿Por qué hiciste el BINGO?">
              <p>Como un regalo a mi madre en tiempos del COVID-19.</p>
            </FaqItem>
          </ul>
          <br/>
          <br/>
        </div>
    )
}


const BingoWizard = () => {
  const { state,dispatch } = useContext(BingoContext)

  const config = state.config

  const dispatchConfig = (config) => {
    dispatch({type:'set-config', config:config})
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
    if(!file)
      return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const image = new Image()
      image.src = reader.result
      image.onload = () =>{
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext("2d")
        const w = 1000
        const h = 300
        canvas.width = w
        canvas.height = h
        const iw = image.width
        const ih = image.height
        const s = Math.max(w/iw, h/ih)
        // get the top left position of the image
        const x = (w/2) - (iw/2) * s
        const y = (h/2) - (ih/2) * s
        ctx.drawImage(image, x, y, iw*s, ih*s)

        const dataURL = canvas.toDataURL("image/jpeg")
        dispatchConfig({customHeader: dataURL })
      }
    }

  }
  
  const onToggleTitle = () => {
    dispatchConfig({showTitle: !config.showTitle })
  }

  const onRemoveCustomHeader = () => {
    dispatchConfig({showTitle: true, customHeader: '' })
  }

  const onToggleStyle = () => {
    dispatchConfig({style: config.style === 'bingo90' ? 'bingo75' : 'bingo90'})
  }

  const onToggleCanvas = () => {
    dispatchConfig({showCanvas: !config.showCanvas })
  }

  return state.sessionReady ?
    (
      <div className="setup">

        <h4>Opciones de Partida</h4>
        <span>Imagen de fondo</span>
        <br/>
        <button className="filepicker">
          { config.customHeader.length>0 ? 'CAMBIAR': 'SELECCIONAR'}
          <input type="file" onChange={handleFileChange} multiple={false} accept={"image/png, image/jpeg"} />
        </button>
        { config.customHeader.length>0 && (<>
          <button onClick={onRemoveCustomHeader}>QUITAR</button>
          <br/>
          <span>Mostrar título:</span>
          <button className={config.showTitle ? 'on':''} onClick={onToggleTitle}>{config.showTitle ? 'SI':'NO'}</button>
          </>)}

        <br/>
        <br/>
        <span>¿Quién ve el bolillero?</span>
        <br/>
        <button onClick={onToggleCanvas}>{config.showCanvas ? 'TODOS' : 'SOLO EL ANFITRION'}</button>
        <br/>
        <br/>
        <span>¿Qué estilo de bingo quieres?</span>
        <br/>
        <button onClick={onToggleStyle}>{config.style === 'bingo90' ? 'BINGO 90' : 'BINGO 75'}</button>
        <br/>
        <br/>
        <h4>Opciones Predeterminadas</h4>
        <BingoConfig/>
        <br/>

        <h4>Participantes</h4>
        {state.players.length === 0 ?
          <p>Aún no hay participantes en la partida.</p>
          : 
          <>
            <p>Hay <strong>{state.players.length}</strong> participantes en la partida. </p>
            <br/>
          </>
        }
      </div>
    )
    :(
      <div className="setup">
        <h4>¿Qué quieres hacer?</h4>
        <div>
          <button onClick={createSession}>Crear una partida</button>
          <button onClick={onHereForMusic}>¡Solo vine por la música!</button>
        </div>
        
      </div>
    )

}


const Card = ({card, style}) => {
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
    <div className={ `card ${style}` }>
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
  config:{
    customHeader: '',
    showCanvas: true,
    pianoOn: true,
    style: 'bingo90',
    pianoScale: 0,
    autoCall: false,
    vfx: 2,
    showChat: true,
    showJitsi: true,
    showTitle: true,
  }

}

const reducer = (state, action) => {
  switch (action.type) {
    case "set-config":
      return { ...state, config:{...state.config,...action.config }}
    case "set-props":
      return { ...state, ...action.state }
    case "add-ball":
      const ball = action.ball
      // do not duplicate balls, due to remote update
      if(state.balls.includes(ball))
        return state
      else
        return {...state, balls:[ball, ...state.balls]}
    case "finish-game":
      return {...state, balls:[],playing: false}
    case "restart-game":
      return {...state, balls:[],playing: true}
    case "set-players":
      const players = action.players
      return {...state, players}
    case 'client-connected': {
      const peerId = action.peerId
      const {config, players,balls, messages,loading,playing} = state
      const s = {config, players,balls, messages,loading,playing}
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
      init({isClient:true,session: d[0], peerId:d[1]})
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
        config: state.config,
        onlyMusic: state.onlyMusic,
      }
      reactLocalStorage.setObject('last-bingo-session',s)
    }
    return () => {}
  },[state.config, state.onlyMusic,state.playing,state.sessionReady,state.balls,state.messages,state.session,state.peerId,state.players])

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
              console.log(state)
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
    <Layout location={location} bodyClass="bingo" >
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

    if((!state.isClient && state.sessionReady) || player){
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

  return (state.isClient || state.sessionReady) && (
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
  const [wannaTry,setWannaTry] = useState(true)
  const headingIdx = state.rollingBall ? Math.floor(state.rollingBall/15) : null
  return (
    <>
    <div className={`header ${state.config.showTitle ? '' : 'no-title'}`} style={{backgroundImage:`url(${state.config.customHeader})`}}>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{state.rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
    </div>
    {!state.isClient && wannaTry && (<>
      <p>Prueba la nueva versión</p>
      <button onClick={()=>navigate('/bingo')}>DALE</button>
      <button onClick={()=>setWannaTry(false)}>NO, GRACIAS</button>
      <br/>
      <br/>
      <br/>
      </>)}
    </>
  )
}

const BingoInner = ({location}) => {
  const { state} = useContext(BingoContext)

  const player = state.players.filter(p => p.peerId ===state.peerId)[0]

  // single layout for master and clients
  return (
    <div className={`${state.onlyMusic ? 'only-music' :  ''}`}>
      <BingoHeader />
      <BingoSession location={location}/>
      { !state.loading && ( 
        <>
          <BingoFaq/>
          <div className="game">
            {(!state.isClient || state.config.showCanvas) && 
              <div className="main">
                <BingoCanvas />
                {!state.isClient && <BingoBalls />}
              </div>
            }
            <div className="aside">
              {state.isClient ?
                (player && !state.playing &&
                  <p>
                    {`¡Hola ${player.name}! Estamos calentando motores. En breve comienza la partida.`} 
                  </p>
                )
                :
                (<>
                  { !state.playing && <BingoWizard/> }
                  <BingoPlayers/>
                </>)
              }
              {state.config.showChat && <BingoChat />}
              {state.config.showJitsi && <VideoConference />}
              {state.isClient && <BingoBalls reversed={true} />}
            </div>
          </div>
          {player && player.cards.map((c,i)=> <Card key={i} card={c} style={state.config.style} />) }
        </>
      ) }
    </div>
  )
}

export default BingoIndex
