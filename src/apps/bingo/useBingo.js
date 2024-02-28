import { useContext, useEffect } from 'react'
import GlobalContext from '../../components/context'
import Context from './context'
import { reactLocalStorage } from 'reactjs-localstorage'

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

  const onMsg = (message) => {
    if (message.room === matchId) {
      dispatch({ type: 'add-message', message })
    }
  }

  const onBall = (data) => {
    if (data.matchId === matchId) {
      dispatch({ type: 'add-ball', ball: data.ball })
    }
  }

  useEffect(() => {
    // remember the storedId
    if (state.storedId === null) {
      const storedId = reactLocalStorage.get('bingo-match-id', null)
      dispatch({ type: 'set-stored-id', storedId })
    }

    if (state.initialized || !matchId) return

    dispatch({ type: 'set-initialized' })

    service.on('ball', onBall)
    chatService.on('msg', onMsg)

    const fetchData = async () => {
      try {
        const match = await service.get(matchId)
        dispatch({ type: 'set-match', match })
      } catch (error) {
        dispatch({ type: 'set-match', match: null })
        console.log('error', error)
      }
    }
    fetchData()

    return () => {
      if (state.initialized) {
        chatService.off('msg', onMsg)
        service.off('ball', onBall)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.initialized])

  const ownsMatch = () => state.storedId === matchId

  const createMatch = async () => {
    try {
      const match = await service.create(newMatch)
      console.log('create', match)
      reactLocalStorage.set('bingo-match-id', match._id)
      dispatch({ type: 'set-stored-id', storedId: match._id })
      return match
    } catch (error) {
      console.log('create', error)
      return null
    }
  }

  const updateMatch = async (props) => {
    const match = { ...state.match, ...props }
    // optimistic UI
    dispatch({ type: 'set-match', match })
    try {
      const m = await service.patch(matchId, match)
      dispatch({ type: 'set-match', match: m })
    } catch (error) {
      dispatch({ type: 'set-match', match: null })
    }
  }

  const ballsMax = () => {
    if (!state.match) return 90
    else return state.match.style === 'bingo90' ? 90 : 75
  }

  const addBall = async (ball) => {
    //dispatch({type: "add-ball", ball})
    const match = state.match
    await ballsService.patch(match._id, { ball })
  }

  const sendText = async ({ name, text }) => {
    const room = matchId
    await chatService.patch(room, { name, text, room })
  }

  return {
    ...state,
    createMatch,
    updateMatch,
    sendText,
    addBall,
    ownsMatch,
    ballsMax,
  }
}

export default useBingo
