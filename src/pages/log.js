import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../layouts/main"
import SEO from "../components/seo"


const LogIndex = ({ data, location }) => {

  const posts = [] //data.allMarkdownRemark.edges

  return (
    <Layout location={location} >
      <SEO
        title="diego dorado"
      />
      <p className="spacey">
        Sometimes I feel like writing...
      </p>
      <section className="texts">
        {posts.map(({ node }) => {
          return (
            <article key={node.fields.slug}>
              <Img fixed={node.frontmatter.cover.childImageSharp.fixed} />
              <div className="text" >
                <h3>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h3>
                <p>{node.frontmatter.description}</p>
              </div>
            </article>
            )
          })}
      </section>
    </Layout>
  )

}

export default LogIndex
