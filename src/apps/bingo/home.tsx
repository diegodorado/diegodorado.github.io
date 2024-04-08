import React from 'react'
import { navigate } from 'gatsby'
import { useBingo } from './useBingo'

const Home = () => {
  const { createMatch, match, isOwner } = useBingo()

  const onCreateClick = () => {
    const match = createMatch()
    navigate(`/bingo/${match.id}/edit`)
  }

  return (
    <div className="setup">
      {isOwner && (
        <div>
          <button onClick={() => navigate(`/bingo/${match.id}/edit`)}>
            Editar partida anterior
          </button>
          <button onClick={() => navigate(`/bingo/${match.id}/play`)}>
            Reanudar partida anterior
          </button>
        </div>
      )}
      <div>
        <button onClick={onCreateClick}>Crear una partida nueva</button>
        <button onClick={() => navigate('/bingo/faq')}>
          Necesito más información
        </button>
      </div>
    </div>
  )
}

export default Home
