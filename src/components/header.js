import React from "react"
import { Link } from "gatsby"
import {reactLocalStorage} from 'reactjs-localstorage'
import Helmet from "react-helmet"

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


const partiallyActive = () => ({ isPartiallyCurrent }) => ({
  className: (isPartiallyCurrent ? `active` : ``),
})

const PLink = ({  ...rest }) => (
  <Link getProps={partiallyActive()} {...rest} />
)
const swaps = [['i','1'],['e','3'],['o','0'],['g','6'],['a','4']]
const original = 'diego dorado'


class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: original, theme: 'dark'}
  }

  getDiff(){
    let diff = 0
    for(let i=0;i<original.length;i++){
      diff += (this.state.title[i]===original[i]) ? 0 : 1
    }
    return diff
  }

  timer() {
    let i = Math.floor(Math.random()*swaps.length)
    let from = Math.round(Math.random())
    if(this.getDiff()>3) from = 1
    let to = from ? 0 : 1
    if(Math.random()<0.51){
      this.setState({
        title: this.state.title.replace(swaps[i][from],swaps[i][to])
      })
    }
  }

  componentDidMount(){
    this.intervalId = setInterval(this.timer.bind(this), 100);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
    const theme = reactLocalStorage.get('theme', 'dark')
    this.setState({theme: theme})

  }

  onMouseClick = (e) => {
    e.preventDefault()
    const new_theme = (this.state.theme==='dark') ? 'light' : 'dark'
    this.setState({theme: new_theme})
    reactLocalStorage.set('theme', new_theme)
  }

  render() {
    return (
      <header>
        <Helmet bodyAttributes={{class:this.state.theme }}  meta={meta} />
        <h1>
          <Link to={`/`}>{this.state.title}</Link>
        </h1>
        <nav>
          <a title="change theme color" href="/" onClick={this.onMouseClick}>◐</a>|<PLink to={`/work`}>Work</PLink>|<PLink to={`/bio`}>Bio</PLink>|<PLink to={`/pics`} >Pics</PLink> {/* | <PLink to={`/texts`}>Texts</PLink>*/}
        </nav>
      </header>
    )
  }
}

export default Header
