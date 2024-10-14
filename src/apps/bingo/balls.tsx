import React from 'react'

type BallsProps = {
  reversed: boolean
  balls: number[]
}
const Balls = ({ reversed, balls }: BallsProps) => {
  return (
    <div className="balls">
      {(reversed ? balls.reverse() : balls).map((b, i) => (
        <span key={i}>{b}</span>
      ))}
    </div>
  )
}

export default Balls
