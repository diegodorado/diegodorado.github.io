import React from 'react'
import { useParams } from '@reach/router'
import Ranking from './ranking'
import Balls from './balls'
import Canvas from './canvas'
import { navigate } from 'gatsby'
import { useBingo } from './useBingo'

const Lead = () => {
  const { matchId } = useParams()
  const { players, balls, updateMatch, owner } = useBingo(matchId)

  const onRestartClick = async () => {
    await updateMatch({ balls: [] })
  }

  const onEndClick = async () => {
    await updateMatch({ balls: [], playing: false })
    navigate(`/bingo/${matchId}/edit`)
  }

  if (!owner) return <h4>Invalid match...</h4>

  return (
    <div className="game">
      <div className="main">
        <Canvas />
        <Balls />
      </div>
      <div className="aside">
        <Ranking players={players} balls={balls} />
        <button onClick={() => navigate(`/bingo/${matchId}/edit`)}>
          EDITAR PARTIDA
        </button>
        <button onClick={onRestartClick}>RECOMENZAR</button>
        <button onClick={onEndClick}>FINALIZAR</button>
      </div>
    </div>
  )
}

export default Lead
