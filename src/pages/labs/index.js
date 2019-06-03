import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"

class LabsIndex extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout location={this.props.location} >
        <SEO title="bio" />
        <p className="spacey">
          Hi there! Welcome to the <strong><em>labs page</em></strong>.<br/>
          Here you can find some web experiments to try out.
        </p>
        <ul>
          <li>
            <h4><Link to={`/labs/live-emojing`} >Live Emojing Playground</Link></h4>
            <p>
              Embrace live coding by playing with emojis.
              Try out some TidalCycles patterns right in the browser.
              You may even join someone doing <Link to={`/works/live-emojing`} >live emojing</Link> if there is an open session.
            </p>
          </li>
          <li>
            <h4><Link to={`/labs/cv2612`} >CV2612 Editor</Link></h4>
            <p>
              A browser-based editor for the <Link to={`/works/cv2612`} >CV2612.</Link>, made to edit its patches and midi mappings.
              <br/>
              You can have a taste of its sound as it has an emulator.
            </p>
          </li>
          <li>
            <h4><Link to={`/labs/fmtribe`} >FM TRIBE</Link></h4>
            <p>FMTribe by is an OPL3 synth/drum machine/thingie focused on live jamming for DOS.
            <br/>
            Developed by <a href="https://github.com/munshkr" target="_blank">munshkr</a> and brought to the browser thanks to <a href="https://js-dos.com/" target="_blank">js-dos</a>.
            Checkout <a href="https://github.com/munshkr/fmtribe" target="_blank">fmtribe sources</a>.</p>
          </li>

        </ul>
        <p className="spacey">
          There are also miscellaneous contents listed that would otherwise be hidden <em>(even for me)</em>
        </p>
        <ul>
          <li><a href="/live-emojing-presentation/" target="new" >Live Emojing Presentation</a></li>
          <li>... not much more</li>
        </ul>
      </Layout>
    )
  }
}

export default LabsIndex

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, maxHeight: 563) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
