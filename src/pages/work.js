import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

class WorkIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const first = posts[0].node.fields.slug

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="work" />
        <p className="spacey">I am Diego Dorado, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.
        </p>
        <p>
          <Link to={first}>Explore</Link> the projects that {"I've"} been working on
        </p>
        <section className="posts">
          {posts.map(({ node }) => {
            return (
              <article className="post" key={node.fields.slug}>
                <Img fixed={node.frontmatter.cover.childImageSharp.fixed} />
                <div className="card">
                  <h3>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </h3>
                </div>
                <h3>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h3>
              </article>
              )
            })}
        </section>
      </Layout>
    )
  }
}

export default WorkIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter:{fileAbsolutePath:{regex:"/.*index.md/"} fields:{type:{eq:"works"}}} sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            cover {
                childImageSharp{
                  fixed(width: 320, height:320) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
          }
        }
      }
    }
  }
`
