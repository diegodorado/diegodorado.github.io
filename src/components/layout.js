import React from "react"
import { Link,navigate } from "gatsby"


class Layout extends React.Component {
  constructor(props){
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event){
    if(event.keyCode === 27) {
      navigate(`/`)
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div id="app">
        <header>
          <h1>
            <Link to={`/`}>{title}</Link>
          </h1>
          <nav>
            <Link to={`/work`}>Work</Link> | <Link to={`/pics`}>Pics</Link> | <Link to={`/bio`}>Bio</Link> | <Link to={`/read`}>Read</Link>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
