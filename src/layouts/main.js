import "../components/i18n"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"


class Layout extends React.Component {

  render() {
    const { children , location} = this.props

    return (
      <div id="app">
        <Header location={location} />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
