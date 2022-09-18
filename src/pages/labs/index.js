import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "../../components/link"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import { useTranslation } from "react-i18next"

const link = (to, inner, absolute) =>
  absolute ? (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link to={to}>{inner}</Link>
  )

const LabsIndex = ({ data, location }) => {
  const [t, i18n] = useTranslation()
  const siteTitle = data.site.siteMetadata.title
  const lang = i18n.languages[0]

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="labs" />
      <p className="spacey">{t("IntroLabs")}</p>
      <section className="posts">
        {data.allLabsYaml.edges.map(({ node }, i) => {
          return (
            <article key={i}>
              {link(
                node.link,
                <Img fixed={node.image.childImageSharp.fixed} />,
                node.absolute
              )}
              <h3>{link(node.link, node.title, node.absolute)}</h3>
              <p>{node[`description_${lang}`]}</p>
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allLabsYaml {
      edges {
        node {
          title
          absolute
          link
          description_en
          description_es
          image {
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

export default LabsIndex
