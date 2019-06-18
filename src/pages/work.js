import React from "react"
import { graphql } from "gatsby"
import Link from "../components/link"
import Img from 'gatsby-image'
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { Trans, useTranslation } from 'react-i18next'

const WorkIndex = ({ data, location }) => {
  const [t, i18n] = useTranslation();
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const first = posts[0].node.fields.slug

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="work" />
      <p className="spacey">{t('Intro')}</p>
      <p>
        <Trans i18nKey="Explore" components={[<Link to={first}>Explore</Link>]} />
      </p>
      <section className="posts">
        {posts.map(({ node }) => {
          if(node.fields.locale==='' || node.fields.locale===i18n.language)
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

export default WorkIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter:{fields:{type:{eq:"works"},index:{eq:true}}} sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            locale
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
