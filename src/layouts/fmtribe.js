import React from "react"
import Helmet from "react-helmet"

class FMTRIBELayout extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div id="app">
        <Helmet bodyAttributes={{class:'dark fmtribe'}} />
        <main>{children}</main>
      </div>
    )
  }
}

export default FMTRIBELayout
