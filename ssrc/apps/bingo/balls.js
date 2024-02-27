import React from "react"
import useBingo from "./useBingo"

const Balls = ({reversed}) => {
  const {balls, match} = useBingo()
  return (
  <div className="balls">
    {(reversed ? balls.reverse() : balls).map((b,i) => <span key={i} className={b===match.rollingBall? 'rolling' : ''}>{b}</span>)}
  </div>)
}

export default Balls
