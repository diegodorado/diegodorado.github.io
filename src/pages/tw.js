import React from "react"
import Layout from "../layouts/main"
import Twitter from '../components/live-emojing/twitter'

const TwIndex = ({ data, location }) => {
  const parts = location.hash.split('#')
  const id = (parts.length >1) ? decodeURIComponent(parts[1]) : ''

  return (
    <Layout location={location} >
      <Twitter id={id}/>
    </Layout>
  )
}

export default TwIndex
