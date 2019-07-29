import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../layouts/main"
import SEO from "../components/seo"

class BioIndex extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout location={this.props.location} >
        <SEO title="bio" />
        <p className="spacey">Soy Diego Dorado, livecoder, programador y artista electrónico. Me apasionan los proyectos de investigación que combinan la innovación tecnológica con las expresiones artísticas.
        </p>
        <Img fluid={data.file.childImageSharp.fluid} />
        <p className="spacey">
        He trabajado como desarrollador web, desarrollador de videojuegos, compositor musical, diseñador sonoro y como educador. <br/> <br/>
        Como artista he participado en varias obras de arte electrónico codeando para microcontroladores, videojuegos, procesamiento de señales, audiovisuales, sonorización de datos y webs interactivas; así como para diferentes formatos: realidad virtual, realidad aumentada, fulldome, mapping, performance audiovisual, instalaciones sonoras y tecno-textiles.
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
