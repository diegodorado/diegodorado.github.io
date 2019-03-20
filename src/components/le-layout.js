import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import Brand from "./header/brand"
import { FaExpand,
         FaCompress
        } from 'react-icons/fa'

class LELayout extends React.Component {


  constructor(props){
    super(props);
    this.state = { expanded: false }
  }

  onExpandClick = (e) => {
    e.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }


  render() {
    const { children } = this.props

    return (
      <div id="app">
        <header>
          <Helmet htmlAttributes={{class:(this.state.expanded ? 'full-screen':'normal') }} />
          <Helmet bodyAttributes={{class:'dark live-emojing'}} />
          <Brand title="Live Emojing 😎"/>
          <a className="expand" href="/" onClick={this.onExpandClick}>
            <FaExpand/>
            <FaCompress/>
          </a>
        </header>
        <main>{children}</main>
      </div>
    )
  }
}

export default LELayout
