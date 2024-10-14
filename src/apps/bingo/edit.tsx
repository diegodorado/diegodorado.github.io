import { useParams } from '@reach/router'
import { navigate } from 'gatsby'
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaEye, FaPrint, FaShareAlt, FaTrashAlt } from 'react-icons/fa'
import Card from './card'
import Loading from './loading'
import { Player, useBingo } from './useBingo'
import { copyLink, fullUrl } from './utils'

const Edit = () => {
  const { matchId } = useParams()
  const { match, addPlayer, removePlayer, toggleStyle } = useBingo(matchId)

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

  if (match === undefined) return <Loading />

  const playersCount = Object.keys(match.players).length

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
            {playersCount === 0 ? (
              <p>Agrega participantes a la partida.</p>
            ) : (
              <>
                <p>
                  Hay <strong>{playersCount}</strong> participantes en la
                  partida.{' '}
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
            {playersCount > 0 && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Participante</th>
                      <th>Cartones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(match.players).map(([key, player]) => {
                      const url = fullUrl(`/bingo/${matchId}/${key}/play`)
                      return (
                        <tr key={key}>
                          <td className={`player`}>{player.name}</td>
                          <td>{player.cards.length}</td>
                          <td
                            className="action"
                            onClick={() => onPrintClick(player)}
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
                            onClick={() => removePlayer(key)}
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
