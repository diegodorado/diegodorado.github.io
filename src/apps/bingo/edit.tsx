import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react'
import { Player, useBingo } from './useBingo'
import { useParams } from '@reach/router'
import { copyLink, fullUrl } from './utils'
import { FaShareAlt, FaPrint, FaEye, FaTrashAlt } from 'react-icons/fa'
import { navigate } from 'gatsby'
import Loading from './loading'
import Card from './card'

const Edit = () => {
  const { matchId } = useParams()
  const { match, addPlayer, removePlayerAt, toggleStyle, isOwner } =
    useBingo(matchId)

  console.log(isOwner, matchId, match.id)

  const [previewPlayer, setPreviewPlayer] = useState<Player | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [numCards, setNumCards] = useState(1)
  const playerNameRef = useRef<HTMLInputElement>(null)

  const link = fullUrl(`/bingo/${matchId}/join`)

  const createPlayer = () => {
    addPlayer(playerName, numCards)
    setPlayerName('')
    setTimeout(() => {
      if (playerNameRef.current) playerNameRef.current?.focus()
    }, 100)
  }

  const onKeyPlayerName: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (playerName.length > 0 && e.key === 'Enter') {
      createPlayer()
    }
  }

  const onChangePlayerName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPlayerName(e.target.value)
  }

  const onChangeNumCards: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setNumCards(parseInt(e.target.value, 10))
  }

  const onAddPlayerClick = () => {
    if (playerName.length === 0) {
      playerNameRef.current?.focus()
    } else {
      createPlayer()
    }
  }

  const handleToggleStyle = () => {
    toggleStyle()
  }

  const onStartClick = async () => {
    navigate(`/bingo/${matchId}/play`)
  }

  const onEndClick = () => {
    //   updateMatch({ balls: [] })
    navigate(`/bingo/${matchId}/edit`)
  }

  const onPrintClick = (p: Player) => {
    setPreviewPlayer(p)
  }

  useEffect(() => {
    if (previewPlayer) {
      window.print()
      setPreviewPlayer(null)
    }
  }, [previewPlayer])

  // if (!owner) return <h4>Invalid match...</h4>

  // if (initialized === false) return <Loading />

  return (
    <>
      {previewPlayer && (
        <div className="preview">
          <h4>Cartones de {previewPlayer.name}</h4>
          {previewPlayer.cards.map((c, i) => (
            <Card key={i} card={c} style={match.style} />
          ))}
        </div>
      )}
      <div className="edit">
        <h4>Editar Partida</h4>
        <p>
          Puedes compartir un único enlace a todos los participantes, o enlaces
          individuales.
        </p>
        <div className="share-link">
          <input type="text" value={link} readOnly />
          <button onClick={(ev) => copyLink(link, ev.currentTarget)}>
            COPIAR ENLACE
          </button>
        </div>
        <br />
        <br />
        <div className="game">
          <div className="main">
            {match.players.length === 0 ? (
              <p>Agrega participantes a la partida.</p>
            ) : (
              <>
                <p>
                  Hay <strong>{match.players.length}</strong> participantes en
                  la partida.{' '}
                </p>
                <br />
              </>
            )}
            <div className="input-box">
              <input
                ref={playerNameRef}
                type="text"
                placeholder="Participante"
                value={playerName}
                onChange={onChangePlayerName}
                onKeyPress={onKeyPlayerName}
              />
              <select value={numCards} onChange={onChangeNumCards}>
                {[1, 2, 3, 4, 5].map((n) => {
                  return (
                    <option key={n} value={n}>
                      {n === 1 ? '1 cartón' : `${n} cartones`}
                    </option>
                  )
                })}
              </select>
              <button onClick={onAddPlayerClick}>Agregar</button>
            </div>
            {match.players.length > 0 && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Participante</th>
                      <th>Cartones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.players.map((p, i) => {
                      const url = fullUrl(`/bingo/${matchId}/${i}/play`)
                      return (
                        <tr key={`${i}`}>
                          <td className={`player`}>{p.name}</td>
                          <td>{p.cards.length}</td>
                          <td
                            className="action"
                            onClick={() => onPrintClick(p)}
                          >
                            <FaPrint />
                          </td>
                          <td
                            className="action"
                            onClick={(ev) => copyLink(url, ev.currentTarget)}
                          >
                            <FaShareAlt />
                          </td>
                          <td className="action">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaEye />
                            </a>
                          </td>
                          <td
                            className="action"
                            onClick={() => removePlayerAt(i)}
                          >
                            <FaTrashAlt />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <ul>
                  <li>
                    <FaPrint /> imprimir cartones
                  </li>
                  <li>
                    <FaShareAlt /> copia el enlace individual
                  </li>
                  <li>
                    <FaEye /> previsualiza los cartones
                  </li>
                  <li>
                    <FaTrashAlt /> quita un participante
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="aside">
            <div className="setup">
              <span>¿Qué estilo de bingo quieres?</span>
              <br />
              <button onClick={handleToggleStyle}>
                {match.style === 'bingo90' ? 'BINGO 90' : 'BINGO 75'}
              </button>
              <br />
              <br />
              <button onClick={onStartClick}>
                {match.balls.length > 0
                  ? 'REANUDAR PARTIDA'
                  : 'COMENZAR PARTIDA'}
              </button>
              {match.balls.length > 0 && (
                <button onClick={onEndClick}>FINALIZAR PARTIDA</button>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <button onClick={() => navigate('/bingo')}>VOLVER</button>
      </div>
    </>
  )
}

export default Edit
