import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"

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
