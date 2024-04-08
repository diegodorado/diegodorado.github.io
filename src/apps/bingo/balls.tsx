import React from 'react'
import { useBingo } from './useBingo'

type BallsProps = {
  reversed?: boolean
}
const Balls = ({ reversed = false }: BallsProps) => {
  const { balls, rollingBall } = useBingo()
  return (
    <div className="balls">
      {(reversed ? balls.reverse() : balls).map((b, i) => (
        <span key={i} className={b === rollingBall ? 'rolling' : ''}>
          {b}
        </span>
      ))}
    </div>
  )
}

export default Balls
