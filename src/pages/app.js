
import React from "react"
import { Router } from "@reach/router"
import Layout from "../layouts/main"

const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: Your name will appear here</li>
      <li>E-mail: And here goes the mail</li>
    </ul>
  </>
)

const App = () => (
  <Layout>
    <Router>
      <Profile path="/app/profile" />
    </Router>
    <p>asdfasdfasdf</p>
  </Layout>
)

export default App
