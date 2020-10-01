import React, { useReducer, useEffect} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import Context from "./context"
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'

 
const socket = io('http://localhost:3030')
const api = feathers()
api.configure(socketio(socket, {timeout: 2000}))
api.configure(auth())

const initialState = {
  theme: 'dark',
  api,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "set-theme":
      return {...state, theme: action.theme}
    case "toggle-theme":
      const value = (state.theme==='dark') ? 'light' : 'dark'
      reactLocalStorage.set('theme',value)
      return {...state, theme: value}
    case "login":
      api.reAuthenticate().then(() => {
        console.log('reauthenticated;')
      }).catch((err) => {
        console.log('could not reauthenticated;',err)
        api.authenticate({strategy:'anonymous'}).then((a) => {
          console.log('authenticated;')
        }).catch((err) => {
          console.log('could not authenticated;',err)
        })
      })

      return state
    default:
      console.log(action)
      throw new Error()
  }
}

const Provider = ({children}) =>{

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(() => {
    dispatch({ type: "set-theme", theme: reactLocalStorage.get('theme','dark')})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider
