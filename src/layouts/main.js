//initialize i18n here
import "../components/i18n"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"

const Layout = ({ children , location})  =>
  <div id="app">
    <Header location={location} />
    <main>{children}</main>
    <Footer />
  </div>

export default Layout
