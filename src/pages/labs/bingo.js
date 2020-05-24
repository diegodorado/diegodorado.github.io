import React, {useState, useEffect,useRef} from "react"
import {  reactLocalStorage} from 'reactjs-localstorage'
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import Bingo from "../../components/bingo"
import { FaShareAlt,
         FaEye,
         FaTrashAlt,
        } from 'react-icons/fa'

const copy2clip = (text) => {
  const dummy = document.createElement('input')
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}


const shuffle = (a) => {
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
    col  = shuffle(col).slice(0,5)
    if(i===2)
      col[2]=0
    c.push(col)
  }
  return c
}

const BingoMaster = ({location}) => {
  const [balls, setBalls] = useState([])
  const [rollingBall, setRollingBall] = useState(null)
  const [mayCall, setMayCall] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [lastBingo, setLastBingo] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const [players, setPlayers] = useState([])
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)

  useEffect(()=>{
    // false means not set, while null means no previous data
    if(lastBingo===false)
      setLastBingo(reactLocalStorage.getObject('last-bingo',null))
    else
      reactLocalStorage.setObject('last-bingo', {players,balls})

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[players,balls])

  useEffect(() => {
    const draw = time => {
      const bingo = bingoRef.current
      rafRef.current = requestAnimationFrame(draw)
      bingo.update()
    }

    bingoRef.current = new Bingo(canvasRef.current,onBingoStatusChanged)
    //draw first frame
    bingoRef.current.draw()
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, []) // Make sure the effect runs only once

  const onBingoStatusChanged = (status,number) => {
    setRollingBall(number)
    if(status===4)
      completeBingoCall(number)
  }

  const completeBingoCall = (number) => {
    if(!number)
      number = rollingBall
    bingoRef.current.complete()
    setBalls(b => [number, ...b])
    setMayCall(true)
    setTimeout( ()=> setRollingBall(null),2000)
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

  const addPlayer = () => {
    const cards = []
    for(let i = 0; i< numCards; i++)
      cards.push(randomCard())
    const player = {name:playerName,cards}
    const b64 = btoa(JSON.stringify(player))
    const baseurl = location.href.replace(location.hash,"").replace('#','')
    player.url = `${baseurl}#${b64}`
    setPlayers([player, ...players])
    setPlayerName('')
  }

  const removePlayer = (i) => {
    setPlayers(players.filter( (p,j) => i!==j))
  }

  const onCallClick = (e) => {
    if(mayCall){
      bingoRef.current.call()
      setMayCall(false)
    }else if (rollingBall){
      completeBingoCall()
    }
  }

  const onStartClick = (e) => {
    setPlaying(true)
    bingoRef.current.start()
  }

  const onRecoverGame = (e) => {
    setBalls(lastBingo.balls)
    setPlayers(lastBingo.players)
    bingoRef.current.start(lastBingo.balls)
    setPlaying(true)
  }

  const copyLink = (url,el) => {
    copy2clip(url)
    el.classList.add('copied')
    setTimeout(()=>{
      el.classList.remove('copied')
    },1000)
  }

  const recoverGameMsg = (
    <div className="setup">
      <h4>Recuperar Partida</h4>
      <p>Encontramos una partida anterior, ¿deseas recuperarla?</p>
      <button onClick={onRecoverGame}>Si, por favor</button>
      <button onClick={()=> setLastBingo(null)}>No, gracias</button>
    </div>
  )

  const cardsCount = players.reduce( (a,c) => a+c.cards.length, 0)
  const setupBingo = (
    lastBingo ? recoverGameMsg : 
    <div className="setup">
      <h4>Instrucciones</h4>
      <p>Ingresá el nombre del participante y presiona ENTER para sumarlo a la partida. Podés asignarle más de un cartón. </p>
      {players.length ? <p>Para comenzar la partida, hacé click en 'START'. Ya no podrás modificar los cartones.</p> : <p>Primero que nada, agregá participantes.</p>}
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

  return (
    <div className="twocols">
      <div className="play">
        <div className="canvas">
          <canvas ref={canvasRef} width={600} height={600} />
          {playing && <button onClick={onCallClick}>{mayCall ? 'BOLA' : (rollingBall ? ' >> ' : '...')}</button>}
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

const BingoClient = ({player}) => {
  return (
    <>
      <h5>{player.name} <i>(cartones: {player.cards.length})</i></h5>
      {player.cards.map((c,i)=> <Card key={i} card={c} initialBalls={player.balls} />)}
    </>
  )
}

const getPlayer = (location) => {
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

const BingoIndex = ({location}) => {
  const [ready, setReady] = useState(false)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const p = getPlayer(location)
    setPlayer(p)
    setReady(true)
    return () => {}
  }, []) // Make sure the effect runs only once

  const heading = 'BINGO'.split('')
  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <div className="bingo">
        <h3>
          {heading.map(h=> <span key={h}>{h}</span>)}
        </h3>
        { ready && ( player ? <BingoClient player={player} /> : <BingoMaster location={location} /> ) }
      </div>
    </Layout>
  )
}

export default BingoIndex
