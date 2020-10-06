/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState, useRef} from "react"
import useBingo from "./useBingo"
import {useParams} from "@reach/router"
import {random90Card,random75Card, copyLink , fullUrl } from  "../../apps/bingo/utils"
import { FaShareAlt,
         FaEye,
         FaTrashAlt,
        } from 'react-icons/fa'
import {navigate } from "gatsby"
import Loading from "./loading"

const Edit = () => {
  const { matchId } = useParams()
  const { match, ownsMatch,  updateMatch } = useBingo(matchId)

  const [playerName, setPlayerName] = useState('')
  const [name, setName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const playerNameRef = useRef(null)

  const link = fullUrl(`/bingo/${matchId}/join`)

  const addPlayer = () => {
    const cards = []
    for(let i = 0; i< numCards; i++){
      cards.push(match.style === 'bingo90' ? random90Card() : random75Card())
    }
    const player = {connected:false,name:playerName,cards}
    dispatchPlayers([...match.players, player])
    setPlayerName('')
    setTimeout(()=>{
      if(playerNameRef.current)
        playerNameRef.current.focus()
    },100)
  }

  const removePlayer = (i) => {
    dispatchPlayers(match.players.filter( (p,j) => i!==j))
  }

  const dispatchPlayers = (players) => {
    updateMatch({...match, players})
  }

  const onKeyPlayerName = (e) => {
    if(playerName.length>0 && e.key === 'Enter'){
      addPlayer()
    }
  }

  const onChangePlayerName = (e) => {
    setPlayerName(e.target.value)
  }
  
  const onBlurName = (e) => {
    updateMatch({...match, name})
  }
  
  const onChangeName = (e) => {
    setName(e.target.value)
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

  const handleFileChange = (ev) => {
    const file = ev.target.files[0]
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
        updateMatch({customHeader: dataURL })
      }
    }

  }
  
  const onToggleTitle = () => {
    updateMatch({showTitle: !match.showTitle })
  }

  const onRemoveCustomHeader = () => {
    updateMatch({showTitle: true, customHeader: '' })
  }

  const onToggleStyle = () => {
    //todo: if players not empty, regenerate cards
    const style = match.style === 'bingo90' ? 'bingo75' : 'bingo90'

    const players = match.players.map( p => {
      p.cards = p.cards.map( _ => style === 'bingo90' ? random90Card() : random75Card())
      return p
    })

    updateMatch({style,players})

  }

  const onToggleChat = () => {
    updateMatch({showChat: !match.showChat })
  }

  const onToggleJitsi = () => {
    updateMatch({showJitsi: !match.showJitsi })
  }

  const onStartClick = () => {
    updateMatch({playing: true })
    navigate(`/bingo/${matchId}/play`)
  }

  const onToggleOptions = () => setOptionsOpen(!optionsOpen)

  if(!ownsMatch())
    return (<h4>Invalid match...</h4>)

  if(match===null)
    return <Loading />

  return (
    <>
      <h4>Editar Partida</h4>
      <p>Puedes compartir un único enlace a todos los participantes, o enlaces individuales.</p>
      <div className="share-link">
        <input type="text" value={link} readOnly />
        <button onClick={(ev)=>copyLink(link,ev.currentTarget)}>COPIAR ENLACE</button>
      </div>
      <br/>
      <br/>
      <div className="game">
        <div className="main">
          {match.players.length === 0 ?
            <p>Agrega participantes a la partida.</p>
            : 
            <>
              <p>Hay <strong>{match.players.length}</strong> participantes en la partida. </p>
              <br/>
            </>
          }
          <div className="input-box">
            <input ref={playerNameRef} type="text" placeholder="Participante" value={playerName} onChange={onChangePlayerName} onKeyPress={onKeyPlayerName} />
            <select value={numCards} onChange={onChangeNumCards} >
              {[1,2,3,4,5].map(n => {
                return <option key={n} value={n}>{(n===1) ? '1 cartón' : `${n} cartones`}</option>
              })}
            </select>
            <button onClick={onAddPlayerClick}>Agregar</button>
          </div>
         {match.players.length>0 &&
           (<>
              <table>
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>Cartones</th>
                  </tr>
                </thead>
                <tbody>
                  {match.players.map( (p,i) => {
                      const url = fullUrl(`/bingo/${matchId}/${i}/play`)
                      return (
                        <tr key={`${i}`}>
                          <td className={`player ${p.connected ? 'connected' :''}`}>{p.name}</td>
                          <td>{p.cards.length}</td>
                          <td className="action" onClick={(ev)=>copyLink(url,ev.currentTarget)} ><FaShareAlt /></td>
                          <td className="action"><a href={url} target="_blank" rel="noopener noreferrer"><FaEye/></a></td>
                          <td className="action" onClick={()=>removePlayer(i)} ><FaTrashAlt/></td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
              <ul>
                <li><FaShareAlt/> copia el enlace individual</li>
                <li><FaEye/> previsualiza los cartones</li>
                <li><FaTrashAlt/> quita un participante</li>
              </ul>
            </>)
         }
        </div>
        <div className="aside">
          <div className="setup">
            <button className={optionsOpen ? 'on':''} onClick={onToggleOptions}>{optionsOpen ? 'MENOS OPCIONES' : 'MÁS OPCIONES'}</button>
            {optionsOpen && (
              <div>
                <br/>
              {false &&
                <>
                <span>Nombre de la partida</span>
                <br/>
                <br/>
                <div className="input-box">
                  <input type="text" placeholder="Ej. Super Bingo " value={name} onChange={onChangeName} onBlur={onBlurName} />
                </div>
                </>}
                <br/>
                <span>Imagen de fondo</span>
                <br/>
                <button className="filepicker">
                  { match.customHeader.length>0 ? 'CAMBIAR': 'SELECCIONAR'}
                  <input type="file" onChange={handleFileChange} multiple={false} accept={"image/png, image/jpeg"} />
                </button>
                { match.customHeader.length>0 && (<>
                  <button onClick={onRemoveCustomHeader}>QUITAR</button>
                  <br/>
                  <span>Mostrar título:</span>
                  <button className={match.showTitle ? 'on':''} onClick={onToggleTitle}>{match.showTitle ? 'SI':'NO'}</button>
                  </>)}
                <br/>
                <br/>
                <span>¿Qué estilo de bingo quieres?</span>
                <br/>
                <button onClick={onToggleStyle}>{match.style === 'bingo90' ? 'BINGO 90' : 'BINGO 75'}</button>
                <br/>
                <button className={match.showChat ? 'on':''} onClick={onToggleChat}>{`CHAT ${match.showChat ? 'ON':'OFF'}`}</button>
                <button className={match.showJitsi ? 'on':''} onClick={onToggleJitsi}>{`VIDEO ${match.showJitsi ? 'ON':'OFF'}`}</button>
                <br/>
                <br/>
              </div>)}
            <button onClick={onStartClick}>COMENZAR</button>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <button onClick={() => navigate('/bingo')}>VOLVER</button>
    </>
  ) 

}

export default Edit
