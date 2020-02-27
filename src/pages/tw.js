import React, {useState, useEffect} from "react"
import Layout from "../layouts/main"
import api from '../components/live-emojing/twapi'


const TwIndex = ({ data, location }) => {

  const [tweets, setTweets] = useState([])

  console.log(process.env.GATSBY_FAUNADB_SECRET)

  useEffect(()=>{
    (async () => {
      try {
        const t = await api.readAll()
        setTweets(t)
      } catch (e) {
        console.log(e)
        alert('Error fetching tweets')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <Layout location={location} >
      <ul className="tweets">
        {tweets.map(t => <li key={t[0]}>@{t[1]}: {t[2]} <br/>{t[3]}</li>)}
      </ul>
    </Layout>
  )
}

export default TwIndex
