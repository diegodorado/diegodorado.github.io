import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

const BioImage = props => (
  <StaticQuery
    query={graphql`{
  file(relativePath: {eq: "profile.jpg"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}`}
    render={data => <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} />}
  />
)


export default BioImage
