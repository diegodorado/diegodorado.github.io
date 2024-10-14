import { useParams } from '@reach/router'
import React from 'react'
import Balls from './balls'
import Card from './card'
import Loading from './loading'
import { useBingoPlayer } from './useBingo'

const Play = () => {
  const { matchId, playerId } = useParams()
  const { player, style, balls } = useBingoPlayer(matchId, playerId)

  const handlePrintClick = () => {
    window.print()
  }

  if (player === undefined) return <Loading />

  return (
    <>
      <div className="preview">
        <h4>Cartones de {player.name}</h4>
        {player.cards.map((c, i) => (
          <Card key={i} card={c} style={style} />
        ))}
      </div>
      <div className="play">
        <h4>¡Hola {player.name}!</h4>
        <Balls reversed={true} balls={balls} />
        {player.cards.map((c, i) => (
          <Card key={i} card={c} style={style} />
        ))}
        <br />
        <br />
        <br />
        <button onClick={handlePrintClick}>IMPRIMIR</button>
      </div>
    </>
  )
}
export default Play
