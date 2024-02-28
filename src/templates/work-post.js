import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/main'
import { Seo } from '../components/seo'
import Link from '../components/link'

const WorkPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  let { previous, next } = pageContext

  previous = previous ? <Link to={previous}>{`=>`}</Link> : <span>...</span>
  next = next ? <Link to={next}>{`<=`}</Link> : <span>...</span>

  const pagination = (
    <nav className="pagination">
      {next} <Link to={`/work`}>all works</Link> {previous}
    </nav>
  )

  return (
    <Layout location={location} title={siteTitle}>
      <div className="work-title">
        <h2>{post.frontmatter.title}</h2>
        {pagination}
      </div>
      <div
        className={`${
          post.frontmatter.style ? post.frontmatter.style : ''
        } work-post`}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {pagination}
    </Layout>
  )
}

export default WorkPostTemplate

export const pageQuery = graphql`
  query WorkPostBySlug($slug: String!, $locale: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(
      fields: { locale: { in: [$locale, ""] }, slug: { eq: $slug } }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        style
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

export const Head = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}
