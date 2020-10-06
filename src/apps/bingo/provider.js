import React, { useReducer } from "react"
import Context from "./context"

const initialState = {
  match: null,
  messages: [],
  balls: [],
  initialized: false,
  storedId: null,
}

//todo: add global error
const reducer = (state, action) => {
  switch (action.type) {
    case "set-initialized":
      return { ...state, initialized: true }
    case "set-stored-id":
      const storedId = action.storedId
      return { ...state, storedId}
    case "set-match":{
      const balls = action.match ? action.match.balls : []
      return { ...state, match: action.match, balls}
    }
    case "add-ball":{
      const balls = [action.ball, ...state.balls ]
      return { ...state, balls}
    }
    case "add-message":
      const messages = [...state.messages, action.message]
      return { ...state, messages }
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
