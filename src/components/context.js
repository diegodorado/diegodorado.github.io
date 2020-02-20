import React, { useReducer} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import Helmet from "react-helmet"

const GlobalContext = React.createContext()

const initialState = {
  theme: 'dark',
}

const init = (state) => {
  return {...state, theme: reactLocalStorage.get('theme','dark')}
}

const reducer = (state, action) => {

  switch (action.type) {
    case "toggle-theme":
      const value = (state.theme==='dark') ? 'light' : 'dark'
      reactLocalStorage.set('theme',value)
      return {...state, theme: value}
    default:
      throw new Error()
  }
}

const GlobalProvider = ({children}) =>{

  const [state, dispatch] = useReducer(reducer, initialState, init)
  const value = { state, dispatch }

  return (
    <GlobalContext.Provider value={value}>
      <Helmet bodyAttributes={{class: state.theme }}  />
      {children}
    </GlobalContext.Provider>
  )
}

const GlobalConsumer = GlobalContext.Consumer

export { GlobalContext, GlobalProvider, GlobalConsumer }
