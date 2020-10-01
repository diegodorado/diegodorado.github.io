//initialize i18n here
import "../components/i18n"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Provider from "../components/provider"

const Layout = ({ children, location }) => (
  <Provider>
    <div id="app">
      <Header location={location} />
      <main>{children}</main>
      <Footer />
    </div>
  </Provider>
)

export default Layout
