import { reactLocalStorage } from 'reactjs-localstorage'
import { client } from './messaging'

import { random75Card, random90Card } from './utils'

import { useEffect, useState } from 'react'
import { create } from 'zustand'

type Card = number[][]

type Player = {
  name: string
  cards: Card[]
}

type Match = {
  id: string
  style: 'bingo90' | 'bingo75'
  balls: number[]
  players: Record<string, Player>
}

type BingoState = {
  ready: boolean
  match?: Match
  rollingBall: number
}

type BingoActions = {
  toggleStyle: () => void
  createMatch: () => Match
  test: () => void
  addBall: (ball: number) => void
  addPlayer: (name: string, numCards: number) => void
  removePlayer: (key: string) => void
}

const randomEnough = () =>
  Math.floor(Math.random() * Date.now())
    .toString(16)
    .substring(0, 2)

const restoreMatch = () => {
  const stringifiedMatch = reactLocalStorage.get<string>('bingo-match')
  if (stringifiedMatch) {
    const match = JSON.parse(stringifiedMatch) as Match
    client.sub(`join-${match.id}`, (m) => {
      console.log('resotre ', m)
    })
    return match
  }
}

const saveMatch = (match: Match) => {
  const stringifiedMatch = JSON.stringify(match)
  reactLocalStorage.set('bingo-match', stringifiedMatch)
}

const createMatch = () => {
  const matchId = randomEnough()

  const match: Match = {
    id: matchId,
    balls: [],
    players: {},
    style: 'bingo90',
  }
  client.sub(`join-${match.id}`, (m) => {
    console.log('create', m)
  })
  saveMatch(match)
  return match
}

const useBingoStore = create<BingoState & BingoActions>((set, _get) => ({
  ready: false,
  match: restoreMatch(),
  rollingBall: 0,

  test() {
    client.pub('something', { who: 'am i?' })
  },

  createMatch: () => {
    const match = createMatch()
    set({ match })
    return match
  },

  addBall: (ball) => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const match = { ...state.match }
      match.balls = [ball, ...match.balls]
      client.pub('ball', { ball })
      saveMatch(match)
      return { match }
    })
  },

  toggleStyle: () => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const match = { ...state.match }

      // toggle style
      match.style = match.style === 'bingo90' ? 'bingo75' : 'bingo90'

      // rebuild cards
      const playerKeys = Object.keys(match.players)
      for (let key of playerKeys) {
        const player = match.players[key]
        player.cards = player.cards.map(() =>
          match.style === 'bingo90' ? random90Card() : random75Card()
        )
      }

      saveMatch(match)
      return { match }
    })
  },

  addPlayer: (name: string, numCards: number) => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const cards = []
      for (let i = 0; i < numCards; i++) {
        cards.push(
          state.match.style === 'bingo90' ? random90Card() : random75Card()
        )
      }

      const playerKey = randomEnough()
      const match = { ...state.match }
      match.players[playerKey] = { name, cards }
      saveMatch(match)
      return { match }
    })
  },

  removePlayer: (key: string) => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const match = { ...state.match }
      delete match.players[key]
      saveMatch(match)
      return { match }
    })
  },
}))

useBingoStore.subscribe((state, prevState) => {
  if (prevState.match) {
    console.log('prev match was', prevState.match.id)
    // client.unsubscribe(prevState.match.id) //, prevState.match.id)
  }

  if (state.match) {
    console.log('new match is', state.match.id)
    // subscribeTopics(state.match.id)
  }
})

const updateMatch = (match: Match) => {
  saveMatch(match)
  console.log('update match: ', match)
}

const useBingo = (matchId?: string) =>
  useBingoStore((state) => {
    useEffect(() => {
      if (matchId && state.match?.id !== matchId) {
        // state.setMatchId(matchId)
        console.log('init', matchId, state.match?.id)
      }
    }, [matchId, state.match?.id])

    const ballsMax = () => {
      return state.match?.style === 'bingo90' ? 90 : 75
    }

    const isOwner = state.match?.id === matchId

    return {
      ...state,
      isOwner,
      ballsMax,
    }
  })

const useBingoPlayer = (matchId: string, playerId: string) => {
  const [loading, setLoading] = useState(true)
  const [player, setPlayer] = useState<Player>()
  const [style, setStyle] = useState<string>('bingo90')

  useEffect(() => {
    let match = useBingoStore.getState().match
    if (match?.id !== matchId) {
      console.log('need to join')
      client.pub(`join-${matchId}`, { playerId })
    }

    // setPlayer(match.players[playerId])
    // setStyle(match.style)
    // state.setMatchId(matchId)
    console.log('init', matchId, playerId)
  }, [matchId, playerId])

  return {
    style,
    loading,
    player,
  }
}

export { Player, useBingo, useBingoPlayer }
