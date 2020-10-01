import React, {useContext} from "react"
import {BingoContext} from "./context"

const Balls = ({reversed}) => {
  const { state } = useContext(BingoContext)
  const match = state.match
  return  match && match.balls.length>0 &&
            (<div className="balls">
              {(reversed ? match.balls.reverse() :match.balls).map((b,i) => <span key={i} className={b===state.rollingBall? 'rolling' : ''}>{b}</span>)}
            </div>)
}

export default Balls
