import {useState, useContext,useEffect} from "react"
import GlobalContext from "../../components/context"
import Context from "./context"
import {reactLocalStorage} from 'reactjs-localstorage'

const newMatch = {
  playing: false,
  players: [],
  balls: [],
  customHeader: '',
  name: '',
  style: 'bingo90',
  showChat: true,
  showJitsi: false,
  showTitle: true,
}

const useBingo = (matchId) => {
  const { state: globalState } = useContext(GlobalContext)
  const { state, dispatch } = useContext(Context)
  const service = globalState.api.service('bingo-match')
  const chatService = globalState.api.service('bingo-chat')
  const ballsService = globalState.api.service('bingo-balls')
  const storedId = reactLocalStorage.get('bingo-match-id',null)

  const onMsg = (message) => {
    if(message.room ===matchId){
      dispatch({type: "add-message", message})
    }
  }

  const onBall = (data) => {
    if(data.matchId === matchId){
      dispatch({type: "add-ball", ball: data.ball})
    }
  }

  useEffect( () => {

    if(state.initialized || !matchId)
      return

    dispatch({type: "set-initialized"})

    chatService.on('msg', onMsg)
    service.on('ball', onBall)

    const fetchData = async () => {
      console.log('fetching now')
      try{
        const match = await service.get(matchId)
        dispatch({type: "set-match", match})
      }catch(error){
        dispatch({type: "set-match", match: null})
        console.log('error', error)
      }
    }
    fetchData()

    return () => {
      if(state.initialized){
        chatService.off('msg', onMsg)
        service.off('ball', onBall)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state.initialized])

  const ownsMatch = () => storedId === matchId

  const createMatch =  async () => {
    try{
      const match = await service.create(newMatch)
      reactLocalStorage.set('bingo-match-id',match._id)
      return match
    }catch(error){
      console.log('create',error)
      return null
    }
  }

  const updateMatch = async (props) => {
    const match = {...state.match, ...props}
    console.log('updating match',match, matchId)
    // optimistic UI
    dispatch({type: "set-match", match})
    try{
      const m = await service.patch(matchId,match)
      console.log('updated match', m)
      dispatch({type: "set-match", match:m})
    }catch(error){
      dispatch({type: "set-match", match: null})
      console.log('error', error)
    }
  }

  const ballsMax = () => {
    if(!state.match)
      return 90
    else
      return (state.match.style === 'bingo90') ? 90 : 75
  }

  const addBall = async (ball) => {
    //dispatch({type: "add-ball", ball})
    const match = state.match
    const m = await ballsService.patch(match._id,{ball})
  }

  const sendText = async ({name,text}) => {
    const room = matchId
    await chatService.patch(room,{name,text,room})
    //await service.addBall(room,{name,text,room})
  }

  return { ...state, createMatch, updateMatch, sendText, addBall, ownsMatch, storedId, ballsMax }

}

export default useBingo

