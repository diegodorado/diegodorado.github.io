import React, {useState, useEffect} from "react"
import Layout from "../layouts/main"
import api from '../components/live-emojing/twapi'

const TwIndex = ({ data, location }) => {

  const [tweets, setTweets] = useState([])

  useEffect(()=>{
    api.readAll().then((todos) => {
      if (todos.message === 'unauthorized') {
        alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
        return false
      }
      setTweets(todos)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <Layout location={location} >
      <ul className="tweets">
        {tweets.map((t,i) => <li key={i}>{t.text}</li>)}
      </ul>
    </Layout>
  )
}

export default TwIndex
