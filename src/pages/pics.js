import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import CyclicFade from '../components/cyclic-fade'
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans, useTranslation } from 'react-i18next'

const PicsIndex = ({ data, location }) => {
  const [t, ] = useTranslation();
  const pics = data.allFile.edges
  const posts = data.allInstaNode.edges

  return (
    <Layout location={location} >
      <SEO title="pics" />
      <p className="spacey">
        <Trans i18nKey="Random Pics" components={[
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/nicolascroceph" >Nicolás Croce</a>]} />
      </p>
      <CyclicFade speed={2000}>
        {pics.map(({ node }) => {
          return (
            <Img key={node.id} fluid={node.childImageSharp.fluid} />
            )
          })}
      </CyclicFade>
      <p className="spacey">
        {t('These are from Instagram.')}<br/>{t('Follow me there!')} <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/diegdorado/" >@diegdorado</a>
      </p>
      <section className="posts ig">
          {posts.map(({ node }) => {
            return (
              <article className="post" key={node.id}>
                <Img fixed={node.localFile.childImageSharp.fixed} />
                <div className="card">
                  <h3>
                    <a target="_blank" rel="noopener noreferrer" href={'http://instagram.com/p/'+node.id} >{node.caption}{node.mediaType}</a>
                  </h3>
                </div>
              </article>
              )
            })}
        </section>
    </Layout>
  )
}

export default PicsIndex

export const pageQuery = graphql`
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
    allInstaNode(filter: {, mediaType: { in: ["IMAGE", "CAROUSEL_ALBUM"]}},sort:{fields:[likes],order:DESC} limit:12) {
      edges {
        node {
          id
          caption
          mediaType
          localFile {
            childImageSharp {
              fixed(width: 320, height: 320) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
