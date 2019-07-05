import React from "react"
import Brand from "../components/header/brand"
import Helmet from "react-helmet"
import "../components/i18n"


class Layout extends React.Component {

  render() {
    const { children } = this.props

    return (
      <div id="app">
        <header>
          <Helmet bodyAttributes={{class:'dark cv2612'}} />
          <Brand title="diego dorado"/>
        </header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
