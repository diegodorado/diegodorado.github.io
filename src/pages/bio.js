import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"

class BioIndex extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout location={this.props.location} >
        <SEO title="bio" />
        <p className="spacey">{"I'm"} Diego Dorado, livecoder, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.
        </p>
        <Img fluid={data.file.childImageSharp.fluid} />
        <p className="spacey">
        I have worked as a Web Developer, Desktop Developer, Video Game Developer, Systems Consultant, Composer, Sound Designer and as an Educator. <br/> <br/>
        As an artist I have participated in various works of electronic art by coding on microcontrollers, videogames, signal processing, audiovisuals, live programming, sound data and interactive webs; as well as for different formats: virtual reality, augmented reality, fulldome, mapping, audiovisual performance, sound installations and e-textiles.
        </p>
      </Layout>
    )
  }
}

export default BioIndex

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
