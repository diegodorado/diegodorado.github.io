//initialize i18n here
import "../components/i18n"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import {GlobalProvider} from "../components/context"

const Layout = ({ children , location})  =>
  <GlobalProvider>
    <div id="app">
      <Header location={location} />
      <main>{children}</main>
      <Footer />
    </div>
  </GlobalProvider>

export default Layout
