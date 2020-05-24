import React, {useState, useEffect,useRef} from "react"
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
  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const [players, setPlayers] = useState([])
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const bingoRef = useRef(null)

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
    console.log("bing status",status,number)
    if(status===4)
      completeBingoCall(number)
  }

  const completeBingoCall = (number) => {
    if(!number)
      number = rollingBall
    console.log('completed',number)
    bingoRef.current.complete()
    setBalls(b => [number, ...b])
    setMayCall(true)
    setTimeout( ()=> setRollingBall(false),2000)
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
    const baseurl = location.href.replace(location.hash,"")
    player.url = `${baseurl}#${b64}`
    player.showCard = false
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
    bingoRef.current.started = true
    bingoRef.current.spinning = true
  }

  const copyLink = (url,el) => {
    copy2clip(url)
    el.classList.add('copied')
    setTimeout(()=>{
      el.classList.remove('copied')
    },1000)
  }

  const cardsCount = players.reduce( (a,c) => a+c.cards.length, 0)
  const setupBingo = (
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
  const playBingo = (
    <div className="results">
      {balls.length>0 &&
      <div className="balls">
        {balls.map((b,i) => <span key={i} className={b===rollingBall? 'rolling' : ''}>{b}</span>)}
      </div>
      }
      <table>
        <thead>
          <tr>
            <th>Cartón</th>
            <th>Aciertos</th>
            <th>Columnas</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players.map( p => {
            return p.cards.map((c,i) => {
              const achievements = c.map(r =>{
                return r.reduce( (a,x) => (balls.includes(x)?1:0)+a, 0)
              })
              const aciertos = achievements.reduce( (a,x) => x+a, 0)
              const rows = achievements.filter(r => r===5).length
              const url = p.url+queryStr
              return (
                <tr key={i}>
                  <td>{p.name} #{i+1}</td>
                  <td>{aciertos}</td>
                  <td>{rows}</td>
                  {i>0? <td/> : <td className="action" onClick={(ev)=>copyLink(url,ev.currentTarget)} ><FaShareAlt /></td>}
                  {i>0? <td/> : <td className="action"><a href={url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>}
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="twocols">
      <div className="play">
        <canvas ref={canvasRef} width={600} height={600} />
        {playing && <button onClick={onCallClick}>{mayCall ? 'BOLA' : (rollingBall ? ' >> ' : '...')}</button>}
        {!playing && (players.length>0) && <button onClick={onStartClick}>START</button>}
      </div>
      { !playing &&  setupBingo }
      { playing && playBingo }
    </div>
  )

}

const Card = ({card,interactive,initialBalls}) => {
  const [balls, setBalls] = useState([])
  
  useEffect(() => {
    setBalls(initialBalls)
    return () => {}
  }, []) // Make sure the effect runs only once

  const onCellClick = (c) => {
    console.log(balls)
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
                 onClick={ interactive ? ()=> onCellClick(c) : null}
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
      {player.cards.map((c,i)=> <Card key={i} card={c} interactive={true} initialBalls={player.balls} />)}
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
  const player = getPlayer(location)
  const isMaster = (player===null)

  const heading = 'BINGO'.split('')
  return (
    <Layout location={location} >
      <SEO title="bingo" />
      <div className="bingo">
        <h3>
          {heading.map(h=> <span key={h}>{h}</span>)}
        </h3>
        { isMaster ? <BingoMaster location={location} /> : <BingoClient player={player} /> }
      </div>
    </Layout>
  )
}

export default BingoIndex
