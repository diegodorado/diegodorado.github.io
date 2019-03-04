import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"

class WorkPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let { previous, next } = this.props.pageContext

    if (previous) {
      previous = <Link to={previous.fields.slug}>previous</Link>
    } else {
      previous = <span>...</span>
    }
    if (next) {
      next = <Link to={next.fields.slug}>next</Link>
    } else {
      next = <span>...</span>
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h2 className="work-title">{post.frontmatter.title}</h2>
        <div className="work-post" dangerouslySetInnerHTML={{ __html: post.html }} />
        <nav className="pagination">
          {previous} | <Link to={`/work`}>all works</Link> | {next}
        </nav>
      </Layout>
    )
  }
}

export default WorkPostTemplate

export const pageQuery = graphql`
  query WorkPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
