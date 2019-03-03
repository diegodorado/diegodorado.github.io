import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"

class BioIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="diego dorado"
        />
        <p className="spacey">{"I'm"} Diego Dorado, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.
        <br/>  <br/>  
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
