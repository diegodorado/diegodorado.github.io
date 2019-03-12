import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class WorkPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let { previous, next } = this.props.pageContext

    previous = previous ? <Link to={previous.fields.slug}>{`=>`}</Link>
                        : <span>...</span>
    next = next ? <Link to={next.fields.slug}>{`<=`}</Link>
                : <span>...</span>

    const pagination = <nav className="pagination">
                         {next} <Link to={`/work`}>all works</Link> {previous}
                       </nav>

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="work-title">
          <h2>{post.frontmatter.title}</h2>
          {pagination}
        </div>
        <div className="work-post" dangerouslySetInnerHTML={{ __html: post.html }} />
        {pagination}
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
