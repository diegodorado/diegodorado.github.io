import React from "react"
import { Router } from "@reach/router"
import Bingo from "../apps/bingo/"
import Layout from "../layouts/main"

const NotFound = () => <div>Sorry, nothing here.</div>

const App = ({ location }) => (
  <Layout location={location}>
    <Router>
      <NotFound default />
    </Router>
  </Layout>
)

export default App
