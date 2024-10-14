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
  restartMatch: () => void
  createMatch: () => Match
  addBall: (ball: number) => void
  addPlayer: (name: string, numCards: number) => void
  removePlayer: (key: string) => void
}

const randomEnough = () => Math.floor(Math.random() * Date.now()).toString(16)
//.substring(0, 2)

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
  saveMatch(match)
  return match
}

const useBingoStore = create<BingoState & BingoActions>((set, _get) => ({
  ready: false,
  rollingBall: 0,

  createMatch: () => {
    const match = createMatch()
    set({ match })
    return match
  },

  restartMatch: () => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const match = { ...state.match, balls: [] }
      saveMatch(match)
      return { match }
    })
  },

  addBall: (ball) => {
    set((state) => {
      if (state.match === undefined) {
        throw new Error('no match yet')
      }
      const match = { ...state.match }
      match.balls = [ball, ...match.balls]

      client.pub(`balls-${match.id}`, {
        balls: match.balls,
      })
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

type PlayerJoinedMessage = {
  playerId: string
}

const handlePlayerJoined = (data: object) => {
  const { playerId } = data as PlayerJoinedMessage
  console.log('player joined:', playerId)
  const { balls, style, players, id } = useBingoStore.getState().match as Match
  client.pub(`player-${id}-${playerId}`, {
    player: players[playerId],
    style,
  })
  client.pub(`balls-${id}`, {
    balls,
  })
}

useBingoStore.subscribe((state, prevState) => {
  console.log('new match is', state.match?.id, prevState.match?.id)
  if (prevState.match) {
    client.unsub(`join-${prevState.match.id}`)
  }

  if (state.match) {
    client.sub(`join-${state.match.id}`, handlePlayerJoined)
  }
})

const tryRestoreMatch = () => {
  const stringifiedMatch = reactLocalStorage.get<string>('bingo-match')
  if (stringifiedMatch) {
    const match = JSON.parse(stringifiedMatch) as Match
    useBingoStore.setState({ match })
  }
}

tryRestoreMatch()

const useBingo = (matchId?: string) =>
  useBingoStore((state) => {
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
  const [balls, setBalls] = useState<number[]>([])
  const [style, setStyle] = useState<string>('bingo90')

  useEffect(() => {
    client.sub(`player-${matchId}-${playerId}`, (m) => {
      // @ts-ignore
      setPlayer(m.player)
      // @ts-ignore
      setStyle(m.style)
      setLoading(false)
    })
    client.sub(`balls-${matchId}`, (m) => {
      // @ts-ignore
      setBalls(m.balls)
      // @ts-ignore
    })
    client.pub(`join-${matchId}`, { playerId })

    return () => {
      client.unsub(`player-${matchId}-${playerId}`)
      client.unsub(`balls-${matchId}`)
    }
  }, [matchId, playerId])

  return {
    style,
    loading,
    player,
    balls,
  }
}

export { Player, useBingo, useBingoPlayer }
