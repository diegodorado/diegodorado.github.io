import React from "react"
import Helmet from "react-helmet"

const Layout = ({ children , location})  =>
  <div id="app">
    <header>
      <Helmet bodyAttributes={{class:'dark io'}} />
    </header>
    <main>{children}</main>
  </div>

export default Layout
