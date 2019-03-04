import React from "react"
import { Link } from "gatsby"

const partiallyActive = () => ({ isPartiallyCurrent }) => ({
  className: (isPartiallyCurrent ? `active` : ``),
})

const PLink = ({  ...rest }) => (
  <Link getProps={partiallyActive()} {...rest} />
)
const swaps = [['i','1'],['e','3'],['o','0'],['g','6'],['a','4']]
const original = 'diego dorado'

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: original}
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
  }

  render() {
    const { children } = this.props

    return (
      <div id="app">
        <header>
          <h1>
            <Link to={`/`}>{this.state.title}</Link>
          </h1>
          <nav>
            <PLink to={`/work`}>Work</PLink> | <PLink to={`/bio`}>Bio</PLink> | <PLink to={`/pics`} >Pics</PLink> {/* | <PLink to={`/texts`}>Texts</PLink>*/}
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2019 Diego Dorado</footer>
      </div>
    )
  }
}

export default Layout
