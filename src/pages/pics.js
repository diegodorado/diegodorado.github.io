import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

class PicsIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allInstaNode.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="diego dorado"
        />
        <p>I am Diego Dorado, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.
        </p>
        <p>
        Some of my recent works:
        </p>
        <section className="posts">
            {posts.map(({ node }) => {
              return (
                <article className="post" key={node.id}>
                  <Img fixed={node.localFile.childImageSharp.fixed} />
                  <div className="card">
                    <h3>
                      <a target="_blank" rel="noopener noreferrer" href={'http://instagram.com/p/'+node.id} >{node.caption}</a>
                    </h3>
                  </div>
                </article>
                )
              })}
          </section>
      </Layout>
    )
  }
}

export default PicsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allInstaNode(sort:{fields:[likes],order:DESC} limit:9) {
      edges {
        node {
          id
          caption
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
