import React, { useReducer, useEffect} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import Helmet from "react-helmet"

const GlobalContext = React.createContext()

const initialState = {
  theme: 'dark',
}

const reducer = (state, action) => {

  switch (action.type) {
    case "set-theme":
      return {...state, theme: action.theme}
    case "toggle-theme":
      const value = (state.theme==='dark') ? 'light' : 'dark'
      reactLocalStorage.set('theme',value)
      return {...state, theme: value}
    default:
      throw new Error()
  }
}

const GlobalProvider = ({children}) =>{

  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(() => {
    dispatch({ type: "set-theme", theme: reactLocalStorage.get('theme','dark')})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <GlobalContext.Provider value={value}>
      <Helmet bodyAttributes={{class: state.theme }}  />
      {children}
    </GlobalContext.Provider>
  )
}

const GlobalConsumer = GlobalContext.Consumer

export { GlobalContext, GlobalProvider, GlobalConsumer }
