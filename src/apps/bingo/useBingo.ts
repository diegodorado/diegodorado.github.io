import { reactLocalStorage } from 'reactjs-localstorage'

import nkn from '../../../node_modules/nkn-sdk/dist/nkn.min.js'
import type { MultiClient } from 'nkn-sdk'
import { random90Card, random75Card } from './utils'

import { create } from 'zustand'
import { useEffect } from 'react'

type Card = number[][]

type Player = {
  name: string
  cards: Card[]
}

type Match = {
  id: string
  style: 'bingo90' | 'bingo75'
  balls: number[]
  players: Player[]
}

type BingoState = {
  match: Match
  rollingBall: number
}

type BingoActions = {
  toggleStyle: () => void
  setMatch: (match: Match) => void
  addBall: (ball: number) => void
  addPlayer: (name: string, numCards: number) => void
  removePlayerAt: (i: number) => void
}

const randomEnough = () => Math.floor(Math.random() * Date.now()).toString(16)

let storedMatchId = ''

const restoreMatch = (): Match => {
  const stringifiedMatch = reactLocalStorage.get<string>('bingo-match')
  if (stringifiedMatch) {
    const match = JSON.parse(stringifiedMatch)
    storedMatchId = match.id
    return match
  }

  storedMatchId = ''

  return {
    id: '',
    balls: [],
    players: [],
    style: 'bingo90',
  }
}

const saveMatch = (match: Match) => {
  storedMatchId = match.id
  const stringifiedMatch = JSON.stringify(match)
  reactLocalStorage.set('bingo-match', stringifiedMatch)
}

const useBingoStore = create<BingoState & BingoActions>((set, _get) => ({
  match: restoreMatch(),
  rollingBall: 0,
  setMatch: (match: Match) => set({ match }),
  addBall: (ball: number) => {
    set((state) => {
      const match = { ...state.match }
      match.balls = [ball, ...match.balls]
      client.publish('ball', `${ball}`)
      saveMatch(match)
      return { match }
    })
  },

  toggleStyle: () => {
    set((state) => {
      const match = { ...state.match }
      match.style = match.style === 'bingo90' ? 'bingo75' : 'bingo90'
      match.players = match.players.map((p) => {
        p.cards = p.cards.map((_) =>
          match.style === 'bingo90' ? random90Card() : random75Card()
        )
        return p
      })

      saveMatch(match)
      return { match }
    })
  },

  addPlayer: (name: string, numCards: number) => {
    set((state) => {
      const cards = []
      for (let i = 0; i < numCards; i++) {
        cards.push(
          state.match.style === 'bingo90' ? random90Card() : random75Card()
        )
      }
      const player = { name, cards }
      const match = { ...state.match }
      match.players = [player, ...match.players]
      saveMatch(match)
      return { match }
    })
  },

  removePlayerAt: (i: number) => {
    set((state) => {
      const match = { ...state.match }
      match.players = match.players.filter((_p, j) => i !== j)
      saveMatch(match)
      return { match }
    })
  },
}))

const subscribeTopics = async (topic: string) => {
  await new Promise((resolve) => client.onConnect(resolve))
  await client.subscribe(topic, 100)
  console.log('subscribed', topic)
  // const num = await client.getSubscribersCount('some-topic')
  // const subs = await client.getSubscribers('some-topic')
  // console.log({ num, subs })
}

const client: MultiClient = new nkn.MultiClient()
client.onMessage((message) => {
  const { match } = useBingoStore.getState()
  console.log('got message', message, match)
  // dispatch({ type: 'add-message', message })
  // dispatch({ type: 'add-ball', ball: data.ball })
})

console.log(client.addr)
console.log(client.getSeed())
console.log(client.getPublicKey())

client.onConnectFailed(() => {
  console.error('Alice connect failed')
})

useBingoStore.subscribe((state, prevState) => {
  if (prevState.match.id) {
    console.log('prev match was', prevState.match.id)
    // client.unsubscribe(prevState.match.id) //, prevState.match.id)
  }

  if (state.match.id) {
    console.log('new match is', state.match.id)
    // subscribeTopics(state.match.id)
  }
})

const updateMatch = (match: Match) => {
  saveMatch(match)
  console.log('update match: ', match)
  //       client.publish(state.match.id, 'hello world', { txPool: true })
}

const useBingo = (matchId?: string) =>
  useBingoStore((state) => {
    useEffect(() => {
      if (matchId && state.match.id !== matchId) {
        // state.setMatchId(matchId)
        console.log('init', matchId, state.match.id)
      }
    }, [matchId, state.match.id])

    // remember the storedId
    // const storedMatchId = reactLocalStorage.get('bingo-match-id', null)
    // useBingoStore.setState({ initialized: true })

    const createMatch = () => {
      const matchId = randomEnough()

      const match: Match = {
        id: matchId,
        balls: [],
        players: [],
        style: 'bingo90',
      }

      saveMatch(match)
      // client.publish('some-topic', 'hello world', { txPool: true })
      // dispatch({ type: 'set-stored-id', storedId: matchId })
      useBingoStore.setState({ match })
      return match
    }

    const ballsMax = () => {
      return state.match.style === 'bingo90' ? 90 : 75
    }

    const isOwner = state.match.id === matchId

    return {
      ...state,
      isOwner,
      createMatch,
      ballsMax,
    }
  })

export { Player, useBingo }
