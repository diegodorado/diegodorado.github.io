import React, {useState, useEffect,useRef,useContext,useReducer} from "react"
import {  reactLocalStorage} from 'reactjs-localstorage'
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import Bingo from "../../components/bingo"
import Tone from "tone"
import StartAudioContext from 'startaudiocontext'
import { FaShareAlt,
         FaEye,
         FaTrashAlt,
         FaVideo,
         FaPlay,
         FaVideoSlash,
         FaStop,
        } from 'react-icons/fa'

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { v4 as uuidv4 } from 'uuid'

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


const noiseGen = () => {
  let scale = 1
  const lerp = (a, b, t ) => a * ( 1 - t ) + b * t
  const r = []
  for ( let i = 0; i<256; ++i ) 
    r.push(Math.random());
  const l = r.length - 1
  return {
    scale: x => {scale = x},
    sample: x => {
      const s = x * scale
      const f = Math.floor(s)
      const t = s - f
      const ss = t * t * ( 3 - 2 * t )
      return lerp( r[f%l], r[(f+1)%l], ss )
    }
  }
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

const startPiano = async () =>{
  try {
    await StartAudioContext(Tone.context)
    Tone.context.latencyHint = 'fastest'

    const piano =  new Tone.Sampler({
        "A0" : "A0.[mp3|ogg]",
        "C1" : "C1.[mp3|ogg]",
        "D#1" : "Ds1.[mp3|ogg]",
        "F#1" : "Fs1.[mp3|ogg]",
        "A1" : "A1.[mp3|ogg]",
        "C2" : "C2.[mp3|ogg]",
        "D#2" : "Ds2.[mp3|ogg]",
        "F#2" : "Fs2.[mp3|ogg]",
        "A2" : "A2.[mp3|ogg]",
        "C3" : "C3.[mp3|ogg]",
        "D#3" : "Ds3.[mp3|ogg]",
        "F#3" : "Fs3.[mp3|ogg]",
        "A3" : "A3.[mp3|ogg]",
        "C4" : "C4.[mp3|ogg]",
        "D#4" : "Ds4.[mp3|ogg]",
        "F#4" : "Fs4.[mp3|ogg]",
        "A4" : "A4.[mp3|ogg]",
        "C5" : "C5.[mp3|ogg]",
        "D#5" : "Ds5.[mp3|ogg]",
        "F#5" : "Fs5.[mp3|ogg]",
        "A5" : "A5.[mp3|ogg]",
        "C6" : "C6.[mp3|ogg]",
        "D#6" : "Ds6.[mp3|ogg]",
        "F#6" : "Fs6.[mp3|ogg]",
        "A6" : "A6.[mp3|ogg]",
        "C7" : "C7.[mp3|ogg]",
        "D#7" : "Ds7.[mp3|ogg]",
        "F#7" : "Fs7.[mp3|ogg]",
        "A7" : "A7.[mp3|ogg]",
        "C8" : "C8.[mp3|ogg]"
      }, {
        release : 1,
        baseUrl : "https://tonejs.github.io/examples/audio/salamander/",
        onload: () => {
          //console.log('loaded sampler')
        }
    }).toMaster()

    const ng = noiseGen()
    ng.scale(0.3)
    let step = 0
    piano.step = () => ng.sample(step++)
    piano.last = 0
    piano.notes = []

    return piano

  } catch (e) {
    console.log(e)
  }
}

const scale = [2,3,4,5].reduce((arr,el) => [...arr, ...'CDEGA'.split('').map(x => x+el)],[])

const BingoMaster = ({location}) => {
  const { state } = useContext(BingoContext)

  // 0: welcome, 1: onlyMusic, 2: video, 3: addPlayers
  const [step, setStep] = useState(0)

  const [onlyMusic, setOnlyMusic] = useState(false)
  const [automatic, setAutomatic] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)
  const pianoRef = useRef(null)

  useEffect(() => {

    (async () => {
      pianoRef.current = await startPiano()
    })()

    const draw = time => {
      const bingo = bingoRef.current
      rafRef.current = requestAnimationFrame(draw)
      bingo.update()
    }

    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged, playRandomNote)
    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

  useEffect(() => {
    if(state.playing){
      const remaining = [...Array(90).keys()].map(x => x+1).filter(x=> !state.balls.includes(x))
      bingoRef.current.start(remaining)
      // just in case the browser was reloaded while rolling a ball
      state.provider.doc.getMap('props').set('mayCall',true)
    }
    return () => {}
  }, [state.playing]) 


  const playRandomNote = (velocity) =>{
    const piano = pianoRef.current
    const t = performance.now()
    const dt = t - piano.last
    //prevent double triggers
    if(!piano.loaded || dt<100)
      return

    piano.last = t
    const index = Math.floor(piano.step()*scale.length)
    const note = scale[index]

    piano.notes.unshift(note)
    if (piano.notes.length > 4) {
      const n = piano.notes.pop()
      piano.triggerRelease(n,'+0.5')
    }
    piano.triggerAttack(note,undefined,velocity)
  }

  const playStart = () =>{
    const piano = pianoRef.current
    if(!piano.loaded)
      return
    piano.releaseAll()
    const idxs = []
    while(idxs.length<3){
      //skip some steps
      piano.step()
      piano.step()
      const idx =  Math.floor((0.5 + 0.5*piano.step())*scale.length)
      if(!idxs.includes(idx))
        idxs.push(idx)
    }
    idxs.forEach( (n,i) => piano.triggerAttackRelease(scale[n],(1+i),`+${i*(0.1+Math.random()*0.2)}`, 0.55+Math.random()*0.3) ) 
  }



  const playEnd = () =>{
    const piano = pianoRef.current
    if(!piano.loaded)
      return
    piano.releaseAll()
    const f = Math.floor(0.2*Math.random()*scale.length)
    const s = 3 + Math.floor(Math.random()*3)
    const notes = [0,1,2,3].map( i => {
      const index = (f+s*i) % scale.length
      return scale[index]
    })
    notes.forEach( (n,i) => piano.triggerAttackRelease(n,3,`+0.${i}1`, 0.55+Math.random()*0.3) ) 
  }


  const onBingoStatusChanged = (status,number) => {
    if(status===2)
      playStart()
    if(status===4){
      state.provider.doc.getMap('props').set('rollingBall',number)
      playEnd()
      bingoRef.current.complete()

      state.provider.doc.getArray('balls').insert(0,[number])

      setTimeout( ()=> {
        state.provider.doc.getMap('props').set('rollingBall',null)
        state.provider.doc.getMap('props').set('mayCall',true)
        if(bingoRef.current.automatic)
          bingoRef.current.call()
      },2000)
    }
  }

  const onKeyPlayerName = (e) => {
    if(e.key === 'Enter'){
      addPlayer()
    }
  }

  const onChangePlayerName = (e) => {
    setPlayerName(e.target.value)
  }
  
  const onChangeNumCards = (e) => {
    setNumCards(e.target.value)
  }

  const addPlayer = () => {
    const doc = state.provider.doc
    const players = doc.getArray('players')
    const cards = []
    for(let i = 0; i< numCards; i++)
      cards.push(randomCard())
    const player = {name:playerName,cards}
    player.url = `${state.baseUrl}/${playerName}`
    players.push([player])
    setPlayerName('')
  }

  const removePlayer = (i) => {
    const doc = state.provider.doc
    const players = doc.getArray('players')
    players.delete(i,1)
  }

  const onCallClick = (e) => {
    state.provider.doc.getMap('props').set('mayCall',false)
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


  const onStartClick = (e) => {
    state.provider.doc.getMap('props').set('playing',true)
  }

  const onHereForMusic = (e) => {
    setOnlyMusic(true)
    state.provider.doc.getMap('props').set('playing',true)
  }

  const onRecoverGame = (e) => {
    const doc = state.provider.doc
    const players = doc.getArray('players')
    const balls = doc.getArray('balls')
    balls.push(state.lastBingo.balls)
    players.push(state.lastBingo.players)
    //bingoRef.current.start(state.lastBingo.balls)
    state.provider.doc.getMap('props').set('playing',true)
  }

  const recoverGameMsg = (
    <div className="setup">
      <h4>Recuperar Partida</h4>
      <p>Encontramos una partida anterior, ¿deseas recuperarla?</p>
      <button onClick={onRecoverGame}>Si, por favor</button>
    {//<button onClick={()=> setLastBingo(null)}>No, gracias</button>
}
    </div>
  )

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
            <h4>Cámara Web</h4>
            <p>Sos el GameMaster, el anfitrión de la partida. Comparte tu cámara para que los participantes puedan seguirte.</p>
            <VideoMaster />
            <button onClick={()=> setStep(3)}>{state.stream ? 'Siguiente.' : 'No, gracias.'}</button>
          </div>
        )
      case 3:
        return (
          <div className="setup">
            <VideoMaster />
            <p>Ingresa el nombre del participante y presiona ENTER para sumarlo a la partida.</p>
            <p>Podés asignarle más de un cartón. </p>
            {state.players.length > 0 && <button onClick={onStartClick}>EMPEZAR</button>}
            <div className="add-player">
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
                          <td>{p.name}</td>
                          <td>{p.cards.length}</td>
                          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                          <td className="action" onClick={(ev)=>copyLink(p.url,ev.currentTarget)} ><FaShareAlt /></td>
                          <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                          <td className="action" onClick={(ev)=>removePlayer(i)} ><FaTrashAlt/></td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td>Link General</td>
                      <td></td>
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
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

  const ranking = state.players.reduce( (arr, p) => {
    return [...arr, ...p.cards.map((c,i) => {
      const countHits =  (a,x) => (state.balls.includes(x)?1:0)+a
      const hits = c.map(r => r.reduce(countHits,0) ).reduce( (a,x) => x+a, 0)
      return {
        name: p.name,
        card: `#${i+1}`,
        url: p.url,
        hits 
      }
    })]
  },[]).sort( (a,b) => b.hits-a.hits)
        
  const playBingo = (
    <div className="results">
      <VideoMaster />
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
                  <td>{r.name}</td>
                  <td>{r.card}</td>
                  <td>{r.hits}</td>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events , jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-static-element-interactions */}
                  <td className="action" onClick={(ev)=>copyLink(r.url,ev.currentTarget)} ><FaShareAlt /></td>
                  <td className="action"><a href={r.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                </tr>
              )
          )}
          <tr>
            <td>Link General</td>
            <td></td>
            <td></td>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
            <td className="action" onClick={(ev)=>copyLink(state.baseUrl,ev.currentTarget)} ><FaShareAlt /></td>
            <td className="action"><a href={state.baseUrl} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const headingIdx = state.rollingBall ? Math.floor(state.rollingBall/15) : null
  

  return (
    <>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{state.rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
      { !onlyMusic && (
        <div className="warning">
          <p>Tu pantalla es muy angosta para ser GameMaster.</p>
          <p><button onClick={onHereForMusic}>¡Solo vine por la música!</button></p>
        </div>
      )}
      <div className={`twocols ${onlyMusic? 'only-music' : ''}`}>
        <div className="play">
          <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600} />
            <div className="buttons">
              {automatic && state.playing && <button onClick={toggleAutoClick}>MANUAL</button>}
              {!automatic && state.playing && state.mayCall && <button onClick={toggleAutoClick}>AUTO</button>}
              {!automatic && state.playing && state.mayCall && <button onClick={onCallClick}>LANZAR</button>}
            </div>
          </div>
          {state.balls.length>0 &&
          <div className="balls">
            {state.balls.map((b,i) => <span key={i} className={b===state.rollingBall? 'rolling' : ''}>{b}</span>)}
          </div>
          }
        </div>
        { !state.playing &&  renderStep() }
        { state.playing && playBingo }
      </div>
    </>
  )

}

const Card = ({card,initialBalls}) => {
  //const { state } = useContext(BingoContext)
  const [marks, setMarks] = useState([])
  
  useEffect(() => {
    setMarks(initialBalls)
    return () => {}
  }, []) // Make sure the effect runs only once

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
               /* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
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

const BingoClient = () => {

  const { state} = useContext(BingoContext)

  // grab player
  const player = state.players.filter(p => p.name ===state.username)[0]

  return player ?
    <>
      <h3>
        {heading.map(h=> <span key={h}>{h}</span>)}
      </h3>
      <div className={`twocols`}>
        <div className="play">
          {!state.playing &&
          <p>
            {`¡Hola ${player.name}! Estamos calentando motores. En breve comienza la partida. 
               Aquí veras las bolillas a medida que vayan saliendo.`} 
            { state.stream && ' A la derecha podrás ver la cámara del anfitrión'}
          </p>
          }
          <div className="balls">
            {state.balls.length===0 ? 
              <span>?</span> : 
              state.balls.map((b,i) => <span key={i} className={b===state.rollingBall? 'rolling' : ''}>{b}</span>)}
          </div>
        </div>
        <div className="streaming">
          <VideoClient />
        </div>
      </div>
      {player.cards.map((c,i)=> <Card key={i} card={c} initialBalls={state.balls} />)
      }
    </>
    :
    <div className="full">
      <h3>
        {heading.map(h=> <span key={h}>{h}</span>)}
      </h3>
      <VideoClient/>
      <table>
        <thead>
          <tr>
            <th>Participante</th>
            <th>Cartones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.players.map( (p,i) => 
              (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.cards.length}</td>
                  <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
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
  loading: true,
  mayCall: true,
  playing: false,
  session: null,
  username: null,
  provider: null,
  baseUrl: null,
  streamPeerId : '',
  stream: null,
  players: [],
  peers: [],
  consumers: new Set(),
  balls: [],
  rollingBall: null,
  lastBingo: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, ...action.state }
    case "set-props":
      return { ...state, ...action.state }
    case "set-balls":
      const balls = action.balls
      return {...state, balls}
    case "set-players":
      const players = action.players
      return {...state, players}
    case "set-peers":
      const peers = action.peers
      return {...state, peers}
    case "set-consumers":
      const consumers = action.consumers
      return {...state, consumers}
    case "set-stream":
      const stream = action.stream
      return {...state, stream}
    default:
      throw new Error()
  }
}

const BingoProvider = ({children,location}) =>{

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(()=>{
    //todo: localstorage recall whole session
    // false means not set, while null means no previous data
    //if(state.lastBingo===false)
    //  setLastBingo(reactLocalStorage.getObject('last-bingo',null))
    //else
    //  reactLocalStorage.setObject('last-bingo', {players: state.players,balls: state.balls,channelID: state.channelID})
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state.players,state.balls])

  useEffect(()=>{

    const d = getData(location)
    const s = initialState
    const baseurl = location.href.replace(location.hash,"").replace('#','')

    if(d){
      s.isClient = true
      s.session = d[0]
      if(d[1])
        s.username = d[1]
    }else{
      const last = reactLocalStorage.get('last-bingo-session')
      if(last)
        s.session = last
      else{
        s.session = uuidv4().split('-')[0]
        reactLocalStorage.set('last-bingo-session', s.session)
      }
    }

    s.baseUrl = `${baseurl}#${s.session}`

    const doc = new Y.Doc()
    const provider = new WebrtcProvider(`bingo-${s.session}`, doc)
    const awareness = provider.awareness
    awareness.setLocalStateField("user", s.username ? s.username : 'MASTER')
    //provider.on('synced', synced => console.log('synced!', synced) )

    doc.getArray('players').observeDeep(ev => dispatch({ type: "set-players", players: ev[0].target.toArray() }) )
    doc.getArray('balls').observeDeep(ev => dispatch({ type: "set-balls", balls: ev[0].target.toArray() }) )
    doc.getMap('props').observe(ev => dispatch({ type: "set-props", state: ev.target.toJSON()}) )

    s.provider = provider
    s.loading = false
    dispatch({ type: "initialize", state: s})

    //provider.doc.getMap('props').set('streamPeerId','')
    provider.on('peers', onPeers)

    return () => {
      provider.off('peers', onPeers)
      provider.destroy()
      if(state.stream)
        state.stream.getTracks().forEach( t => t.stop() )
      state.provider.doc.getMap('props').set('streamPeerId','')
      state.consumers.clear()
    }

  },[])

  const onPeers = (ev) => dispatch({ type: "set-peers", peers: ev.webrtcPeers })

  return (
    <BingoContext.Provider value={value}>
      {children}
    </BingoContext.Provider>
  )
}

const LoadingSpinner = () => <h4>Loading...</h4>
const heading = 'BINGO'.split('')
const BingoIndex = ({location}) => {
  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <BingoProvider location={location}> 
        <BingoInner/>
      </BingoProvider>
    </Layout>
  )
}

const VideoMaster = () => {
  const { state, dispatch} = useContext(BingoContext)
  const videoRef = useRef(null)

  const getMedia = async () => {
    // todo: handle video not accesible
    const constraints = {
      video: {width: {exact: 320}, height: {exact: 240}},
      audio: true,
    }
    try{
      // create the master stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      dispatch({type: 'set-stream', stream})
      reactLocalStorage.set('bingo-camera-on', '1')
    }catch (e){
      console.log(e)
    }
  }

  const stopCamera = () => {
    if(state.stream)
      state.stream.getTracks().forEach( t => t.stop() )
    state.provider.doc.getMap('props').set('streamPeerId','')
    state.consumers.clear()
    reactLocalStorage.set('bingo-camera-on', '0')
    dispatch({type: 'set-stream', stream:null})
  }

  useEffect(()=>{
    updateConsumers()
  },[state.peers])

  useEffect(()=>{
    if(state.stream){
      videoRef.current.srcObject = state.stream
      updateConsumers()
      const pId = state.provider.room.peerId
      state.provider.doc.getMap('props').set('streamPeerId',pId)
    }else{
      const on = reactLocalStorage.get('bingo-camera-on', '0')
      if(on==='1')
        getMedia()
    }
  },[state.stream])

  const updateConsumers = () => {
    //todo: remove old peers from set
    if(!state.stream)
      return

    setTimeout( () => {
    state.provider.room.webrtcConns.forEach( c => {
      if(!state.consumers.has(c.remotePeerId)){
        state.stream.getTracks().forEach( t => c.peer.addTrack(t, state.stream) )
        state.consumers.add(c.remotePeerId)
      }
    })
    },1000)

  }

  return (
    <div className={`video ${state.stream ? 'has-stream' : ''}`}>
      {state.stream ? <FaStop onClick={stopCamera}/> : <FaVideo onClick={getMedia}/>}
      <video ref={videoRef}  playsInline autoPlay muted></video>
    </div>
  )
}

const VideoClient = ({}) => {
  const { state,dispatch} = useContext(BingoContext)
  const [started, setStarted] = useState(false)
  const videoRef = useRef(null)

  useEffect(()=>{
    state.provider.room.webrtcConns.forEach(conn => {
      conn.peer.on("stream", handleOnStream)
    })
    return () => {}
  },[state.streamPeerId, state.peers])

  const handleOnStream = stream => dispatch({type: 'set-stream', stream})

  useEffect(()=>{
    if(state.stream)
      videoRef.current.srcObject = state.stream
  },[state.stream])

  const startVideo = () => {
    videoRef.current.play()
    setStarted(true)
  }

  return (
    <div className={`video ${(started && state.stream) ? 'has-stream' : ''}`}>
      <video ref={videoRef} playsInline> </video>
      {!state.stream && <FaVideoSlash />}
      {!started && state.stream && <FaPlay onClick={startVideo} />}
    </div>
  )
}

const BingoInner = () => {
  const { state} = useContext(BingoContext)

  return (
    <>
      <div className="bingo">
        { state.loading ? <LoadingSpinner /> : ( 
          state.isClient ? <BingoClient/> : <BingoMaster /> 
        ) }
      </div>
    </>
  )
}

export default BingoIndex
