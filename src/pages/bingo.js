import React from "react"
import { Router } from "@reach/router"
import Bingo from "../apps/bingo/"
import Layout from "../layouts/main"

const App = ({location}) => (
  <Layout location={location} >
    <Router>
      <Bingo path="/bingo/*" />
    </Router>
  </Layout>
)

export default App
