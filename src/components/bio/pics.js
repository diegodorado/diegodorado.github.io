import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import CyclicFade from '../cyclic-fade'
import { Trans } from 'react-i18next'

const Pics = (props) => (
  <StaticQuery
    query={graphql`
      {
        allFile(
          filter: {
            extension: { regex: "/(jpg)|(jpeg)|(png)/" }
            relativeDirectory: { eq: "pics" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1.5)
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <>
        <CyclicFade speed={2000}>
          {data.allFile.edges.map(({ node }) => {
            return (
              <GatsbyImage
                image={node.childImageSharp.gatsbyImageData}
                key={node.id}
              />
            )
          })}
        </CyclicFade>
        <p>
          <Trans
            i18nKey="Random Pics"
            components={[
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/nicolascroceph"
              >
                Nicolás Croce
              </a>,
            ]}
          />
        </p>
      </>
    )}
  />
)

export default Pics
