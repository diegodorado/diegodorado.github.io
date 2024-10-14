import React, { useMemo } from 'react'
import { Player } from './useBingo'

type RankingProps = {
  players: Record<string, Player>
  balls: number[]
}
const Ranking = ({ players, balls }: RankingProps) => {
  const rank = useMemo(() => {
    const playersArray = Object.values(players)

    const countHits = (a: number, x: number) => (balls.includes(x) ? 1 : 0) + a
    const rowsFinished = (a: number, x: number) => (x === 5 ? 1 : 0) + a
    const sumAll = (a: number, x: number) => x + a

    return playersArray
      .map((p) => {
        const cards = p.cards
          .map((c, j) => {
            const rowHits = c.map((r) => r.reduce(countHits, 0))
            const hits = rowHits.reduce(sumAll, 0)
            const rows = rowHits.reduce(rowsFinished, 0)
            return {
              card: j + 1,
              hits,
              rows,
            }
          })
          .sort((a, b) => b.hits - a.hits)
        const best = cards[0].hits
        return {
          name: p.name,
          best,
          cards,
        }
      })
      .sort((a, b) => b.best - a.best)
  }, [players, balls])

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Participante</th>
          <th>Aciertos</th>
          <th>Líneas</th>
        </tr>
      </thead>
      <tbody>
        {rank.map((p, i) => (
          <React.Fragment key={i}>
            {p.cards.map((c, j) => (
              <tr key={`${i}-${j}`}>
                {j === 0 ? <td>{p.name}</td> : <td></td>}
                <td>#{c.card}</td>
                <td>{c.hits}</td>
                <td>{c.rows}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default Ranking
