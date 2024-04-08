/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useParams } from '@reach/router'
import { fullUrl } from './utils'
import { useBingo } from './useBingo'
import Loading from './loading'

const Join = () => {
  const { matchId } = useParams()
  const { match } = useBingo(matchId)

  if (match === null) return <Loading />

  const sortedPlayers = match.players
    .map((p, i) => {
      return { i, name: p.name }
    })
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))

  return (
    <div className="setup">
      <p>Haz click en tu nombre para ver tus cartones</p>
      <table>
        <tbody>
          {sortedPlayers.map((p) => {
            const url = fullUrl(`/bingo/${matchId}/${p.i}/play`)
            return (
              <tr key={`${p.i}`}>
                <td className={`player`}>
                  <a href={url}>{p.name}</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Join
