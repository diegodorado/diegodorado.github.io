/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import useBingo from "./useBingo"

const BingoHeader = () => {
  const { match } = useBingo()
  const heading = 'BINGO'.split('')
  const showTitle = match ? match.showTitle : true
  const customHeader = match ? match.customHeader : ''
  const rollingBall = match ? match.rollingBall : null
  const headingIdx = rollingBall ? Math.floor(rollingBall/15) : null
  return (
    <div role="button" tabIndex="0" className={`header ${showTitle ? '' : 'no-title'}`} style={{backgroundImage:`url(${customHeader})`}}>
      <h3>
        {heading.map( (h,i)=> (headingIdx===i) ?<span className="rolling" key={i}>{rollingBall}</span>: <span key={i}>{h}</span>)}
      </h3>
    </div>
  )
}

export default BingoHeader
