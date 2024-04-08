import React from 'react'
import { useParams } from '@reach/router'
import { useBingo } from './useBingo'
import Card from './card'
import Balls from './balls'
import Loading from './loading'

const Play = () => {
  const { matchId, playerId } = useParams()
  const { players, matchStyle } = useBingo(matchId)
  console.log(players, matchId)

  // if (match === null) return <Loading />

  //fixme: indexed player will be problematic if players change
  const player = players[playerId]
  if (!player) return <h4>Invalid Link</h4>

  const handlePrintClick = () => {
    window.print()
  }

  return (
    <>
      <div className="preview">
        <h4>Cartones de {player.name}</h4>
        {player.cards.map((c, i) => (
          <Card key={i} card={c} style={matchStyle} />
        ))}
      </div>
      <div className="play">
        <h4>¡Hola {player.name}!</h4>
        <Balls reversed={true} />
        {player.cards.map((c, i) => (
          <Card key={i} card={c} style={matchStyle} />
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
