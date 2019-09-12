import React from "react"
import Brand from "../components/header/brand"
import "../components/i18n"

import Helmet from "react-helmet"

const Layout = ({ children , location})  =>
  <div id="app">
    <header>
      <Helmet bodyAttributes={{class:'dark io'}} />
      <Brand title="instrumento optico"/>
    </header>
    <main>{children}</main>
  </div>

export default Layout
