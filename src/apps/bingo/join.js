import React, {useState,useContext,useEffect} from "react"
import {useParams} from "@reach/router"
import Context from "../../components/context"
import {BingoContext,BingoProvider} from "./context"
import { FaShareAlt,
        } from 'react-icons/fa'
import {copy2clip, copyLink } from  "../../apps/bingo/utils"
import {reactLocalStorage} from 'reactjs-localstorage'
import Ranking from "./ranking"
import Chat from "./chat"
import Balls from "./balls"
import Jitsi from "./jitsi"
import Canvas from "./canvas"
import {navigate } from "gatsby"


const fullUrl = (uri) => (!window) ? '' : `${window.location.origin}${uri}`

const Join = () => {
  const { state, dispatch } = useContext(BingoContext)
  const { state:globalState } = useContext(Context)
  const { matchId } = useParams()
  const [lead,setLead] = useState(false)

  const updateMatch = async (_match) => {
    const service = globalState.api.service('bingo-match')
    dispatch({ type: 'START_FETCH' })
    try{
      const match = await service.patch(matchId,_match)
      dispatch({ type: 'END_FETCH',match })
    }catch(error){
      dispatch({ type: 'END_FETCH',error })
    }
  }

  useEffect( () => {
    const service = globalState.api.service('bingo-match')

    const id = reactLocalStorage.get('bingo-match-id',null)
    if(id===matchId)
      setLead(true)
    else
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

  if(match===null)
    return (
        <div className="setup">
          {state.error ? 
          <h4>Error Loading</h4>
          :<h4>Loading Match</h4>
          }
        </div>
      )

  const sortedPlayers = match.players.map((p,i) => {
    return {i,name:p.name}
  }).sort( (a,b) => (a.name>b.name) ? 1 : ((b.name>a.name) ? -1 :0))

  const onEditClick = () => {
    navigate(`/bingo/${matchId}/edit`)
  }

  const onRestartClick = async () => {
    await updateMatch({...state.match, balls: []})
    navigate(`/bingo/${matchId}/join`,{ replace: true })
  }

  const onEndClick = async () => {
    await updateMatch({...state.match, balls:[],playing: false})
    navigate(`/bingo/${matchId}/edit`)
  }


  if(!lead)
    return (
        <div className="setup">
         <p>Haz click en tu nombre para ver tus cartones (o copia el enlace para compartirlo)</p>
         <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(p => {
                const url = fullUrl(`/bingo/${matchId}/${p.i}/play`)
                return (
                  <tr key={`${p.i}`}>
                    <td className={`player`}><a href={url} target="_blank" rel="noopener noreferrer">{p.name}</a></td>
                    <td className="action" onClick={(ev)=>copyLink(url,ev.currentTarget)} ><FaShareAlt /></td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
      )
  else
    return (
      <div className="game">
        <div className="main">
          <Canvas />
          <Balls />
        </div>
        <div className="aside">
          <Ranking/>
          {match.showChat && <Chat name={'Anfitrión'} room={matchId} />}
          {match.showJitsi && <Jitsi name={'Anfitrión'} room={matchId} />}
          <button onClick={onEditClick}>EDITAR PARTIDA</button>
          <button onClick={onRestartClick}>RECOMENZAR</button>
          <button onClick={onEndClick}>FINALIZAR</button>
        </div>
      </div>
      )

}

export default Join
