import React, {useContext,useEffect} from "react"
import {useParams} from "@reach/router"
import Context from "../../components/context"
import Card from "./card"
import Balls from "./balls"
import Chat from "./chat"
import Jitsi from "./jitsi"
import {BingoContext,BingoProvider} from "./context"

const Play = () => {
  const { state, dispatch } = useContext(BingoContext)
  const { state:globalState } = useContext(Context)
  const { matchId,playerId } = useParams()

  useEffect( () => {
    const service = globalState.api.service('bingo-match')
    service.on('patched', (match) => dispatch({ type: 'END_FETCH',match }))
    const fetchData = async () => {
      dispatch({ type: 'START_FETCH' })
      try{
        const match = await service.get(matchId)
        dispatch({ type: 'END_FETCH',match })
      }catch(error){
        dispatch({ type: 'END_FETCH',error })
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const match = state.match
  const player = (!match) ? null : match.players[playerId]

  if(!player)
    return (
        <div className="setup">
          {state.error ? 
          <h4>Error Loading</h4>
          :<h4>Loading Match</h4>
          }
        </div>
      )

  return (
      <div className="setup">
        <h4>¡Hola {player.name}!</h4>
        {match.showChat && <Chat name={player.name} room={matchId} />}
        {match.showJitsi && <Jitsi name={player.name} room={matchId} />}
        <Balls reversed={true} />
        {player.cards.map((c,i)=> <Card key={i} card={c}  style={match.style} />) }
      </div>
    )
}
export default Play
