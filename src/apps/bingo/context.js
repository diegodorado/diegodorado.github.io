import React, {useReducer} from "react"

const BingoContext = React.createContext()

const initialState = {
  loading: false,
  ball: null,
  match: null,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'BALL': {
      return { ...state, ball: action.ball }
    }
    case 'START_FETCH': {
      // just toggle loading flag
      return { ...state, loading: true }
    }
    case 'END_FETCH': {
      // match and error can be null
      const {match,error} = action
      if(error)
        console.log(error,match)
      return { ...state, loading: false, match, error}
    }
    default:
      console.log(action)
      throw new Error('no such action type')
  }
}

const BingoProvider = ({children}) =>{
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <BingoContext.Provider value={value}>
      {children}
    </BingoContext.Provider>
  )
}

export { BingoContext, BingoProvider}
