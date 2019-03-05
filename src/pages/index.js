import React from "react"
import { navigate } from "gatsby"

class Home extends React.Component {

  componentDidMount() {
    navigate("/work")
  }

  render() {
    return null
  }

}

export default Home
