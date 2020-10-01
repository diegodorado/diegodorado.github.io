import React, {useState, useRef,useContext} from "react"
import {BingoContext} from "./context"

const matchRank = (match) => {
  // get players and cards ranking
  return match.players.map(p => {
    const countHits =  (a,x) => (match.balls.includes(x)?1:0)+a
    const rowsFinished = (a,x) => (x===5?1:0)+a
    const sumAll = (a,x) => x+a
    const cards = p.cards.map((c,j) => {
      const rowHits = c.map(r => r.reduce(countHits,0))
      const hits = rowHits.reduce(sumAll, 0)
      const rows = rowHits.reduce(rowsFinished,0)
      return {
        card: j+1,
        hits ,
        rows
      }
    }).sort( (a,b) => b.hits-a.hits)
    const best = cards[0].hits
    return {
      name: p.name, 
      connected: p.connected,
      best, 
      cards}
  }).sort( (a,b) => b.best-a.best)
        
}

const Ranking = () => {
  const { state, dispatch } = useContext(BingoContext)

  const rank = matchRank(state.match)

  return (
          <table>
            <thead>
              <tr>
                <th>Participante</th>
                <th></th>
                <th>Aciertos</th>
                <th>Líneas</th>
              </tr>
            </thead>
            <tbody>
              {rank.map( (p,i) => 
                  (
                    <React.Fragment key={i}>
                      {p.cards.map( (c,j) => 
                          (
                            <tr key={`${i}-${j}`}>
                              {j===0 ? 
                                <td className={`player ${p.connected ? 'connected' :''}`}>{p.name}</td>
                                :
                                <td></td>
                              }
                              <td>#{c.card}</td>
                              <td>{c.hits}</td>
                              <td>{c.rows}</td>
                            </tr>
                          )
                      )}
                    </React.Fragment>
                  )
              )}
            </tbody>
          </table>)
}

export default Ranking
