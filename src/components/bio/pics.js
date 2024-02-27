import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import CyclicFade from '../cyclic-fade'
import { Trans } from 'react-i18next'

const Pics = props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {eq: "pics"}}) {
            edges {
              node {
                id
                name
                childImageSharp {
                  fluid(maxWidth: 1000, maxHeight: 563) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
    `}
    render={data =>
      <>
        <CyclicFade speed={2000}>
          {data.allFile.edges.map(({ node }) => {
            return (
              <Img key={node.id} fluid={node.childImageSharp.fluid} />
              )
            })}
        </CyclicFade>
        <p>
          <Trans i18nKey="Random Pics" components={[
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/nicolascroceph" >Nicolás Croce</a>]} />
        </p>
      </>
    }
  />
)


export default Pics
