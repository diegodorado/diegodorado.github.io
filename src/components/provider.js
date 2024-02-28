import React, { useReducer } from 'react'
import Context from './context'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'

//const socket = io('http://localhost:3000')
const socket = io('https://api.diegodorado.com')
const api = feathers()
api.configure(socketio(socket, { timeout: 2000 }))
api.configure(auth())

const initialState = {
  api,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      api
        .reAuthenticate()
        .then(() => {
          console.log('reauthenticated;')
        })
        .catch((err) => {
          console.log('could not reauthenticated;', err)
          api
            .authenticate({ strategy: 'anonymous' })
            .then((a) => {
              console.log('authenticated;')
            })
            .catch((err) => {
              console.log('could not authenticated;', err)
            })
        })

      return state
    default:
      console.log(action)
      throw new Error()
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
