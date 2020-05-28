import React, {useState, useEffect,useRef} from "react"
import {  reactLocalStorage} from 'reactjs-localstorage'
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import Bingo from "../../components/bingo"
import Tone from "tone"
import StartAudioContext from 'startaudiocontext'
import { FaShareAlt,
         FaEye,
         FaTrashAlt,
        } from 'react-icons/fa'

const youtubeUrl = (channelID) => channelID.length ? `https://www.youtube.com/embed/live_stream?channel=${channelID}` : null

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
  const first15 = [...Array(15).keys()]
  for(let i=0;i<5;i++){
    let col  = first15.map(a => (15*i)+a+1)
    col  = shuffle(col)
    col  = col.slice(0,5)
    if(i===2)
      col[2]=0
    c.push(col)
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
          console.log('loaded sampler')
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
  const [balls, setBalls] = useState([])
  const [rollingBall, setRollingBall] = useState(null)
  const [onlyMusic, setOnlyMusic] = useState(false)
  const [onlyMusicAck, setOnlyMusicAck] = useState(false)
  const [mayCall, setMayCall] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [lastBingo, setLastBingo] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [channelID, setChannelID] = useState('')
  const [numCards, setNumCards] = useState(1)
  const [players, setPlayers] = useState([])
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)
  const pianoRef = useRef(null)

  useEffect(()=>{
    // false means not set, while null means no previous data
    if(lastBingo===false)
      setLastBingo(reactLocalStorage.getObject('last-bingo',null))
    else
      reactLocalStorage.setObject('last-bingo', {players,balls,channelID})

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[players,balls])

  useEffect(() => {
    const draw = time => {
      const bingo = bingoRef.current
      rafRef.current = requestAnimationFrame(draw)
      bingo.update()
    }

    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged, playRandomNote)
    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)

    {(async () =>{
      pianoRef.current = await startPiano()
    })()}

    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

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
      setRollingBall(number)
      playEnd()
      bingoRef.current.complete()
      setBalls(b => [number, ...b])
      setTimeout( ()=> {
        setRollingBall(null)
        setMayCall(true)
      },2000)
    }
  }

  const onPasteChannelID = (e) => {
    let paste = (e.clipboardData || window.clipboardData).getData('text')
    e.preventDefault()
    setChannelID(paste)
    console.log(paste,e)
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

  const onAddPlayerClick = (e) => {
    addPlayer()
  }

  const encodeUrl = (data) => {
    const b64 = btoa(JSON.stringify(data))
    const baseurl = location.href.replace(location.hash,"").replace('#','')
    return `${baseurl}#${b64}`
  }

  const addPlayer = () => {
    const cards = []
    for(let i = 0; i< numCards; i++)
      cards.push(randomCard())
    const player = {channelID,name:playerName,cards}
    player.url = encodeUrl(player)
    setPlayers([player, ...players])
    setPlayerName('')
  }

  const removePlayer = (i) => {
    setPlayers(players.filter( (p,j) => i!==j))
  }

  const onCallClick = (e) => {
    bingoRef.current.call()
    setMayCall(false)
  }

  const onStartClick = (e) => {
    setPlaying(true)
    bingoRef.current.start()
  }

  const onHereForMusic = (e) => {
    setOnlyMusicAck(true)
    setOnlyMusic(true)
    setPlaying(true)
    bingoRef.current.start()
  }

  const onRecoverGame = (e) => {
    setBalls(lastBingo.balls)
    setPlayers(lastBingo.players)
    bingoRef.current.start(lastBingo.balls)
    setPlaying(true)
  }

  const recoverGameMsg = (
    <div className="setup">
      <h4>Recuperar Partida</h4>
      <p>Encontramos una partida anterior, ¿deseas recuperarla?</p>
      <button onClick={onRecoverGame}>Si, por favor</button>
      <button onClick={()=> setLastBingo(null)}>No, gracias</button>
    </div>
  )

  const fullData = players.map( p => ({
      name: p.name,
      cards: p.cards.length,
      url: p.url
    }))
  const fullUrl = encodeUrl({channelID, players: fullData})

  const cardsCount = players.reduce( (a,c) => a+c.cards.length, 0)
  const setupBingo = (
    lastBingo ? recoverGameMsg : 
    <div className="setup">
      <h4>Instrucciones</h4>
      <p>Sos el GameMaster, así que debes configurar la partida agregando participantes y compartiendoles el enlace en donde vean sus cartones.</p>
      { !onlyMusicAck && (<>
        <button onClick={()=> setOnlyMusicAck(true)}>Ok</button>
        <button onClick={onHereForMusic}>¡Solo vine por la música!</button>
        </>)}
      {channelID.length>0 ?
        <div className="iframe-preview">
          <iframe width="400" height="225" src={youtubeUrl(channelID)}></iframe>
          <button onClick={()=> setChannelID('')}>CAMBIAR</button>
        </div>
        :
        <>
          <p>Para que vean tu live de youtube, pegá acá tu channelID, que encontrás en <a href="https://www.youtube.com/account_advanced" target="_blank" rel="noopener noreferrer">youtube.com/account_advanced</a> </p>
          <div className="add-player">
            <input type="text" placeholder="YOUR_CHANNEL_ID" onPaste={onPasteChannelID} />
          </div>
        </>
      }
      <p>Ingresá el nombre del participante y presiona ENTER para sumarlo a la partida. Podés asignarle más de un cartón. </p>
      {players.length > 0 && <p>Para comenzar la partida, hacé click en 'START'. Ya no podrás modificar los cartones.</p> }
      <div className="add-player">
        <input type="text" placeholder="Nombre" value={playerName} onChange={onChangePlayerName} onKeyPress={onKeyPlayerName} />
        <input type="number" min={1} max={100} value={numCards} onChange={onChangeNumCards} />
      </div>
      {(players.length>0) &&
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
              {players.map( (p,i) => {
                return (
                  <tr key={i}>
                    <td>{p.name}</td>
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
                <td className="action" onClick={(ev)=>copyLink(fullUrl,ev.currentTarget)} ><FaShareAlt /></td>
                <td className="action"><a href={fullUrl} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
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

  const queryStr = '?'+balls.join('-')
  const ranking = players.reduce( (arr, p) => {
    return [...arr, ...p.cards.map((c,i) => {
      const countHits =  (a,x) => (balls.includes(x)?1:0)+a
      const hits = c.map(r => r.reduce(countHits,0) ).reduce( (a,x) => x+a, 0)
      return {
        name: p.name,
        card: `#${i+1}`,
        url: p.url+queryStr,
        hits 
      }
    })]
  },[]).sort( (a,b) => b.hits-a.hits)
        
  const playBingo = (
    <div className="results">
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
                  <td className="action" onClick={(ev)=>copyLink(r.url,ev.currentTarget)} ><FaShareAlt /></td>
                  <td className="action"><a href={r.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  )

  const headingIdx = rollingBall ? Math.floor(rollingBall/15) : null

  return (
    <>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
      { !onlyMusic && (
        <div className="warning">
          <p>
            Tu pantalla es muy angosta para ser GameMaster.
            <button onClick={onHereForMusic}>¡Solo vine por la música!</button>
          </p>
        </div>
      )}
      <div className="twocols">
        <div className="play">
          <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600} />
            {playing && mayCall && <button onClick={onCallClick}>BOLA</button>}
            {!playing && (players.length>0) && <button onClick={onStartClick}>START</button>}
          </div>
          {balls.length>0 &&
          <div className="balls">
            {balls.map((b,i) => <span key={i} className={b===rollingBall? 'rolling' : ''}>{b}</span>)}
          </div>
          }
        </div>
        { !playing &&  setupBingo }
        { playing && playBingo }
      </div>
    </>
  )

}

const Card = ({card,initialBalls}) => {
  const [balls, setBalls] = useState([])
  
  useEffect(() => {
    setBalls(initialBalls)
    return () => {}
  }, []) // Make sure the effect runs only once

  const onCellClick = (c) => {
    if(c>0){
      if(balls.includes(c))
        setBalls(balls.filter(x => x!==c))
      else
        setBalls([...balls, c])
    }
  }

  return (
    <div className="card">
      {card.map(col=>{
        return (
          col.map(c => {
             return (
               <span 
                 key={`c-${c}`} 
                 className={`${balls.includes(c)? 'marked' : ''} ${(c===0)? 'free' : ''}`}
                 onClick={()=> onCellClick(c)}
                 >
                 {c}
               </span>
             )
            }
          )
        )
      })}
    </div>
  )
}

const BingoClient = ({data}) => {

  const streamUrl = youtubeUrl(data.channelID)

  return data.players ?
    <div className="full">
      <h3>
        {heading.map(h=> <span key={h}>{h}</span>)}
      </h3>
      {streamUrl && <iframe width="800" height="450" src={streamUrl}></iframe>}
      <table>
        <thead>
          <tr>
            <th>Participante</th>
            <th>Cartones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.players.map( (p,i) => 
              (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.cards}</td>
                  <td className="action"><a href={p.url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
    :
    <>
      <h3>
        {heading.map(h=> <span key={h}>{h}</span>)}
      </h3>
      <h5>{data.name} <i>(cartones: {data.cards.length})</i></h5>
      {streamUrl && <iframe width="800" height="450" src={streamUrl}></iframe>}
      {data.cards.map((c,i)=> <Card key={i} card={c} initialBalls={data.balls} />)}
    </>
}

const getData = (location) => {
  const parts = location.hash.split('#')
  let t = null
  try{
    const p = parts[1].split('?')
    const u = JSON.parse(atob(decodeURIComponent(p[0])))
    u.balls = []
    if(p[1])
      u.balls = p[1].split('-').map(c => parseInt(c,10))
    t = u
  }
  catch(e){}
  return t 
}

const heading = 'BINGO'.split('')
const BingoIndex = ({location}) => {
  const [ready, setReady] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const p = getData(location)
    setData(p)
    setReady(true)
    return () => {}
  }, []) // Make sure the effect runs only once

  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <div className="bingo">
        { ready && ( data ? <BingoClient data={data} /> : <BingoMaster location={location} /> ) }
      </div>
    </Layout>
  )
}

export default BingoIndex
