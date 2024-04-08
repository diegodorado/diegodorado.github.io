import React, { useReducer } from 'react'
import Context from './context'

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
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
