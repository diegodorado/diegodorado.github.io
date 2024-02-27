import React  from "react"
import {useParams} from "@reach/router"
import useBingo from "./useBingo"
import Card from "./card"
import Balls from "./balls"
import Chat from "./chat"
import Jitsi from "./jitsi"
import Loading from "./loading"

const Play = () => {
  const { matchId, playerId } = useParams()
  const { match, balls } = useBingo(matchId)

  if(match===null)
    return <Loading />

  //fixme: indexed player will be problematic if players change
  const player = match.players[playerId]
  if(!player)
    return <h4>Invalid Link</h4>

  const onPrintClick = () => {
    window.print()
  }

  return (
    <>
      <div className="preview">
        <h4>Cartones de {player.name}</h4>
        {player.cards.map((c,i)=> <Card key={i} card={c}  style={match.style} />) }
      </div>
      <div className="play">
        <h4>¡Hola {player.name}!</h4>
        {match.showChat && <Chat name={player.name} room={matchId} />}
        {match.showJitsi && <Jitsi name={player.name} room={matchId} />}
        <Balls reversed={true} balls={balls} />
        {player.cards.map((c,i)=> <Card key={i} card={c}  style={match.style} />) }
        <br/>
        <br/>
        <br/>
        <button onClick={onPrintClick}>IMPRIMIR</button>
      </div>
    </>
  )
}
export default Play
