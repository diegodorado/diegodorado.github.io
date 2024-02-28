import React from 'react'
import { navigate } from 'gatsby'
import useBingo from './useBingo'

const Home = () => {
  const { createMatch, storedId } = useBingo()

  const onCreateClick = async () => {
    const match = await createMatch()
    if (match) navigate(`/bingo/${match._id}/edit`)
  }

  return (
    <div className="setup">
      <h4>¿Qué quieres eh hacer?</h4>
      {storedId && (
        <>
          <button onClick={() => navigate(`/bingo/${storedId}/edit`)}>
            {' '}
            Editar partida anterior
          </button>
          <button onClick={() => navigate(`/bingo/${storedId}/play`)}>
            {' '}
            Reanudar partida anterior
          </button>
        </>
      )}
      <div>
        <button onClick={onCreateClick}>Crear una partida nueva</button>
        <button onClick={() => navigate('/bingo/music')}>
          Lanzar bolillas
          <span role="img" aria-label="dice">
            🎶{' '}
          </span>
          <span role="img" aria-label="dice">
            🎵{' '}
          </span>
          <span role="img" aria-label="dice">
            🎹
          </span>
        </button>
      </div>
      <button onClick={() => navigate('/bingo/faq')}>
        Necesito más información
      </button>
    </div>
  )
}

export default Home
