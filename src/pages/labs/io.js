import React, { useState, useEffect} from 'react'
import Layout from "../../layouts/io"
import hekaTitle from "../../../content/works/i-o/heka.png"
import hekaVid from "../../../content/works/i-o/heka.mp4"

// workaround to solve SSR
//import QrReader from 'react-qr-reader'
let QrReader = null
try {
  QrReader = require('react-qr-reader')
} catch (e) {
}

const getIndexFromHash = (url) => {
  const parts = url.split('#')
  return (parts.length >1) ? parseInt(parts[1]) : 0
}

const table = [
  {name: 'Titán', symbol: '♈', relations: 'deseo,copula,pelea,defensattack,conquista,dote,danza,dragon,calculador,guru,retiro,civilizar'},
  {name: 'Bestia', symbol: '♉',relations: 'materia,molde,ganado,diva,sirviente,jauladorada,minotauro,soma,cosechaysiembra,zeppelin,edenkitsch'},
  {name: 'Dios bailarin', symbol: '♊',relations: 'verbo,juzgarbelleza,propagar,archivarakashico,seralivianar,psicoanalizar,predicar,comandar,coralear,masterthegame'},
  {name: 'Ninfa pastor', symbol: '♋',relations: 'paraiso,bodamistica,aliciaenelpais,disneyworlds,embarazo,almamater,pachamama,navenodriza,catedral'},
  {name: 'Héroe semidios', symbol: '♌',relations: 'egos,yukomishima,narciso,personaltrainer,johnywalker,davinci,maradona,bjork'},
  {name: 'Reina esclava', symbol: '♍',relations: 'sistema,coregencia,gobiernoculto,teocracia,meritocracia,anarquia,utopia'},
  {name: 'Príncipe consorte', symbol: '⚖',relations: 'cortejo,sexo,lunademiel,ballet,duodinamico,triada'},
  {name: 'Bandida sacrificante', symbol: '♏',relations: 'farmaco,alcohol,tabaco,maria,ayahuasca'},
  {name: 'Curador centauro', symbol: '♐',relations: 'banda,El Peloton,karmapolice,talkingheads'},
  {name: 'Le gigante', symbol: '♑',relations: 'montana,montanarusa,tibet'},
  {name: 'Genio loco', symbol: '♒',relations: 'red,io'},
  {name: 'Adivina maga', symbol: '♓',relations: 'disolucion'},
]

const getRelation = (a,b) => {
  const min = Math.min(a,b)-1
  const max = Math.max(a,b)-1
  const rels = table[min].relations.split(',')
  return rels[max-min]
}

const total = 12
const symbol = (i)  => <span className="symbol">{table[i-1].symbol}</span>
const name = (i)  => <span className="name">{table[i-1].name}</span>

const IoIndex = ({location})  =>{
  const [phase, setPhase] = useState(1)
  const [others, setOthers] = useState([])
  const [myself, setMyself] = useState(1)

  // try to load shadow from hash
  useEffect( ()=> {
    const i = getIndexFromHash(location.hash)
    if(i>0){
      setPhase(3)
      setMyself(i)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const goTop = () =>{
    if(window!==undefined) window.scroll(0,0)
  }


  const handleScanSelf = data => {
    if (data){
      const i = getIndexFromHash(data)
      if(i>0){
        setPhase(3)
        setMyself(i)
        goTop()
      }
    }
  }


  const handleScanOther = data => {
    if (data){
      const i = getIndexFromHash(data)
      if(i>0){
        setOthers(o => o.concat(i))
        setPhase(5)
        goTop()
      }
    }
  }


  const onStart = (ev) => {
    goTop()
    setPhase(2)
  }

  const onContinue = (ev) => {
    goTop()
    setPhase(4)
  }

  const onClaim = (ev) => {
    goTop()
    setPhase(6)
  }

  const count = () => (new Set(others)).size
  const last = () => others[others.length - 1]
  const lastRelation = () => <span className="relation">{getRelation(myself,last())}</span>

  const handleError = err => console.error(err)

  const stats  = () => <div className="stats">
    {(count()===total) ? `¡Completaste las ${total} reuniones!` :  `Llevas ${count()} de ${total} reuniones realizadas`}
    <ul>
    {
      others.reduce((a,b) => {a[b-1]=a[b-1]+1;return a},new Array(12).fill(0)).map((e,i) =>{
        return (e===0 ? null : <li key={i}>
        {symbol(myself)}{symbol(i+1)}
        {name(myself)} + {name(i+1)} = {getRelation(myself,i+1)}
        {e>1 ? `  (¡${e} veces!)` : null}
        </li>)
      })
    }
    </ul>
  </div>


  const phase1Msg  = () => <>
    <p>
      Bienvenide al Juego de las Sombras Parejas
      <br/>
      <br/>
      (permite el uso de la cámara para escanear los códigos)
    </p>
    <button onClick={onStart} >comenzar</button>
  </>

  const phase2Msg  = () => <>
    <p>Para saber quién sos escaneá el QR de tu invitación al juego</p>
    <QrReader className="qr-reader" delay={300} onScan={handleScanSelf} onError={handleError} />
  </>

  const phase3Msg  = () => <>
    <p>
      Bienvenide {name(myself)}
      <br/>
      {symbol(myself)}
      <br/>
      Ahora podés comenzar a buscar tus Sombras Parejas.</p>
    <button onClick={onContinue} >continuar</button>
    {stats()}
  </>

  const phase4Msg  = () => <>
    <p>
      Escaneá los códigos QR de los demás participantes del juego.
      <br/><br/>
      Llevas {count()} de {total} reuniones realizadas
    </p>
    <QrReader className="qr-reader" delay={300} onError={handleError} onScan={handleScanOther} />
  </>

  const phase5Msg  = () => <>
    <p>
      {name(myself)}
      <br/>+
      <br/>{name(last())}
      <br/>=
      <br/>{lastRelation()}
      <br/>
      {symbol(myself)}  {symbol(last())}
      <br/>
    </p>
    {(count()!==total) && <button onClick={onContinue} >continuar la búsqueda</button>}
    {(count()===total) && <button onClick={onClaim} >reclama tu premio!</button>}
    {stats()}
  </>

  const phase6Msg  = () => <>
    <p>
      ¡Felicitaciones! <br/>¡Completaste las {total} reuniones!
    </p>
    <video autoPlay={true} loop={true} muted={true} style={{maxWidth:'100%'}}>
      <source src={hekaVid} type="video/mp4"/>
    </video>
    <p>
    Te damos un deseo en forma de mundo. Busca un miembro de Instrumento Óptico, muestra la manifestación de Heka y llévate lo que mereces.
    <br/>
    <span className="symbol">Ω</span>
    </p>
    {stats()}
  </>

  return (
  <Layout location={location}>
    <img className="title" alt="HEKA" src={hekaTitle} />
    <>
      {(phase===1) && phase1Msg()}
      {(phase===2) && phase2Msg()}
      {(phase===3) && phase3Msg()}
      {(phase===4) && phase4Msg()}
      {(phase===5) && phase5Msg()}
      {(phase===6) && phase6Msg()}
    </>
  </Layout>)

}


export default IoIndex
