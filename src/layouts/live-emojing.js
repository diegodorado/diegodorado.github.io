import React from "react"
import Brand from "../components/header/brand"
import Helmet from "react-helmet"

class LELayout extends React.Component {

  render() {
    const { children } = this.props

    return (
      <div id="app">
        <header>
          <Helmet bodyAttributes={{class:'dark live-emojing'}} />
          <Brand title="Live Emojing 😎"/>
        </header>
        <main>{children}</main>
      </div>
    )
  }
}

export default LELayout
