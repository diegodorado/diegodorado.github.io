import React, {useState, useContext,useEffect} from "react"
import Context from "../../components/context"
import {navigate } from "gatsby"
import {reactLocalStorage} from 'reactjs-localstorage'

const Home = () => {
  const { state, dispatch } = useContext(Context)
  const [matchId, setMatchId] = useState(null)

  const newMatch = {
    playing: false,
    players: [],
    balls: [],
    customHeader: '',
    name: '',
    style: 'bingo90',
    showChat: true,
    showJitsi: false,
    showTitle: true,
  }

  useEffect( () => {
    // try to get saved match
    const service = state.api.service('bingo-match')
    const id = reactLocalStorage.get('bingo-match-id',null)

    const fetchData = async () => {
      try{
        if(id){
          const match = await service.get(id)
          setMatchId(match._id)
        }
      }catch(error){
        console.log(error)
      }
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onCreateClick =  async () => {
    const service = state.api.service('bingo-match')
    try{
      const match = await service.create(newMatch)
      reactLocalStorage.set('bingo-match-id',match._id)
      navigate(`/bingo/${match._id}/edit`)
      //dispatch({ type: 'END_FETCH',match })
    }catch(error){
    }
  }


  return (
    <>
      <div className="setup">
        <h4>¿Qué quieres hacer?</h4>
        {matchId && <button onClick={() => navigate(`/bingo/${matchId}/edit`)}> Recuperar la partida anterior</button>}
        <div>
          <button onClick={onCreateClick}>Crear una partida nueva</button>
          <button onClick={() => navigate('/bingo/music')}>Lanzar bolillas 🎶 🎵 🎹</button>
        </div>
        <button onClick={() => navigate('/bingo/faq')}>Necesito más información</button>
      </div>
    </>)
}

export default Home

