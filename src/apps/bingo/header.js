import React, {useContext} from "react"
import {BingoContext} from "./context"
import {navigate } from "gatsby"

const BingoHeader = () => {
  const heading = 'BINGO'.split('')
  const { state} = useContext(BingoContext)
  const headingIdx = state.rollingBall ? Math.floor(state.rollingBall/15) : null
  const showTitle = state.match ? state.match.showTitle : true
  const customHeader = state.match ? state.match.customHeader : ''
  return (
    <div onClick={()=>navigate('/bingo')} className={`header ${showTitle ? '' : 'no-title'}`} style={{backgroundImage:`url(${customHeader})`}}>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{state.rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
    </div>
  )
}

export default BingoHeader
