import React from 'react'
import { useBingo } from './useBingo'

const BingoHeader = () => {
  const { rollingBall } = useBingo()
  const heading = 'BINGO'.split('')
  const headingIdx = rollingBall ? Math.floor(rollingBall / 15) : null
  return (
    <div role="button" tabIndex={0} className={`header`}>
      <h3>
        {heading.map((h, i) =>
          headingIdx === i ? (
            <span className="rolling" key={i}>
              {rollingBall}
            </span>
          ) : (
            <span key={i}>{h}</span>
          )
        )}
      </h3>
    </div>
  )
}

export default BingoHeader
