import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

const BioImage = props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "profile.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.file.childImageSharp.fluid} />}
  />
)


export default BioImage
