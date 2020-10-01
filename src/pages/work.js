import React from "react"
import { graphql } from "gatsby"
import Link from "../components/link"
import Img from "gatsby-image"
import Layout from "../layouts/main"
import SEO from "../components/seo"
import { useTranslation } from "react-i18next"

const WorkIndex = ({ data, location }) => {
  const [t, i18n] = useTranslation()
  const siteTitle = data.site.siteMetadata.title
  const works = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="work" />
      <p className="spacey">{t("Intro")}</p>
      <p>{t("Recent works")}:</p>
      <section className="posts">
        {works
          .filter(
            ({ node }) =>
              node.fields.locale === "" ||
              node.fields.locale === i18n.languages[0]
          )
          .map(({ node }) => {
            return (
              <article key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  <Img fixed={node.frontmatter.cover.childImageSharp.fixed} />
                </Link>
                <h3>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h3>
                <p>{node.frontmatter.description}</p>
              </article>
            )
          })}
        {/*empty articles just to line up the grid*/}
        <article></article>
        <article></article>
        <article></article>
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
    allMarkdownRemark(
      filter: { fields: { type: { eq: "works" }, index: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            locale
          }
          frontmatter {
            title
            description
            cover {
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
  }
`
