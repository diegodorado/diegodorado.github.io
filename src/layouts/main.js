//initialize i18n here
import "../components/i18n"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Provider from "../components/provider"

import "../styles/app.sass"
require("prismjs/themes/prism-tomorrow.css")

const Layout = ({ children, location, bodyClass }) => (
  <Provider>
    <div id="app">
      <Header location={location} bodyClass={bodyClass}  />
      <main>{children}</main>
      <Footer />
    </div>
  </Provider>
)

export default Layout
