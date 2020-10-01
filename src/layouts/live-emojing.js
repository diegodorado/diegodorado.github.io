import React from "react"
import Brand from "../components/header/brand"
import "../components/i18n"
import LanguagesLinks from "../components/header/languages-links"
import Helmet from "react-helmet"

const Layout = ({ children, location }) => (
  <div id="app">
    <header>
      <Helmet bodyAttributes={{ class: "dark live-emojing" }} />
      <Brand title="live emojing" />
      <nav>
        <LanguagesLinks location={location} />
      </nav>
    </header>
    <main>{children}</main>
  </div>
)

export default Layout
