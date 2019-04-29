import React from "react"
import Brand from "../components/header/brand"
import Helmet from "react-helmet"

class Layout extends React.Component {

  render() {
    const { children } = this.props

    return (
      <div id="app">
        <header>
          <Helmet bodyAttributes={{class:'dark cv2612'}} />
          <Brand title="CV2612"/>
        </header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
