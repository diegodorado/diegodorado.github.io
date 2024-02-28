import React from 'react'
import { Router } from '@reach/router'
import Bingo from '../apps/bingo/'
import { Seo } from '../components/seo'
import Layout from '../layouts/main'

const App = ({ location }) => (
  <Layout location={location} bodyClass="bingo">
    <Router>
      <Bingo path="/bingo/*" />
    </Router>
  </Layout>
)

export default App

export const Head = () => {
  return (
    <>
      <body className="bingo" />
      <Seo title="bingo" />
    </>
  )
}
