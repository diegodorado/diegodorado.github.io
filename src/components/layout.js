import React from "react"
import Footer from "./footer"
import Header from "./header"

class Layout extends React.Component {

  render() {
    const { children } = this.props

    return (
      <div id="app">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
