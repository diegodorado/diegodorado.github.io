import React from "react"
import {useParams} from "@reach/router"
import Ranking from "./ranking"
import Chat from "./chat"
import Balls from "./balls"
import Jitsi from "./jitsi"
import Canvas from "./canvas"
import {navigate } from "gatsby"
import useBingo from "./useBingo"
import Loading from "./loading"

const Lead = () => {
  const { matchId } = useParams()
  const { match, updateMatch, ownsMatch } = useBingo(matchId)

  const onRestartClick = async () => {
    await updateMatch({...match, balls: []})
  }

  const onEndClick = async () => {
    await updateMatch({...match, balls:[],playing: false})
    navigate(`/bingo/${matchId}/edit`)
  }

  if(!ownsMatch())
    return (<h4>Invalid match...</h4>)

  if(match===null)
    return <Loading />

  return (
      <div className="game">
        <div className="main">
          <Canvas />
          <Balls />
        </div>
        <div className="aside"> 
          <Ranking match={match} />
          {match.showChat && <Chat name={'Anfitrión'} room={matchId} />}
          {match.showJitsi && <Jitsi name={'Anfitrión'} room={matchId} />}
          <button onClick={() => navigate(`/bingo/${matchId}/edit`)}>EDITAR PARTIDA</button>
          <button onClick={onRestartClick}>RECOMENZAR</button>
          <button onClick={onEndClick}>FINALIZAR</button>
        </div>
      </div>
    )
}

export default Lead
