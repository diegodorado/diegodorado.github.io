import React from "react"
import { Link } from "gatsby"
import {reactLocalStorage} from 'reactjs-localstorage'
import Helmet from "react-helmet"
import Brand from "./brand"

const meta = [
  {
    name: `viewport`,
    content: `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`,
  },
  {
    name: `theme-color`,
    content: `#ff0000`,
  },
  {
    name: `msapplication-navbutton-color`,
    content: `#ff0000`,
  },
  {
    name: `apple-mobile-web-app-status-bar-style`,
    content: `#ff0000`,
  },
]


const partiallyActive = className => ({ isPartiallyCurrent }) => ({
  className: `${className?className:''} ${isPartiallyCurrent ? 'active': ''}`,
})

const PLink = ({ className, ...rest }) => (
  <Link getProps={partiallyActive(className)} {...rest} />
)



class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {theme: 'dark'}
  }

  componentDidMount(){
    const theme = reactLocalStorage.get('theme', 'dark')
    this.setState({theme: theme})
  }


  onMouseClick = (e) => {
    e.preventDefault()
    const new_theme = (reactLocalStorage.get('theme', 'dark')==='dark') ? 'light' : 'dark'
    this.setState({theme: new_theme})
    reactLocalStorage.set('theme', new_theme)
  }

  render() {
    return (
      <header>
        <Helmet bodyAttributes={{class:this.state.theme }}  meta={meta} />
        <Brand title="diego dorado" />
        <nav>
          <a title="change theme color" href="/" onClick={this.onMouseClick}><span>◐</span></a>
          |<PLink to={`/work`}>Work</PLink>
          |<PLink className="labs" to={`/labs`} >
            <i>L</i>
            <i>a</i>
            <i>b</i>
            <i>s</i>
            </PLink>
          |<PLink to={`/pics`}>Pics</PLink>
          |<PLink to={`/bio`}>Bio</PLink>
          {/* | <PLink to={`/log`}>Log</PLink>*/}
        </nav>
      </header>
    )
  }


}

export default Header
