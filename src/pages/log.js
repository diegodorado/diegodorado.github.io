import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../layouts/main"
import SEO from "../components/seo"
//holaaa
//nada
const LogIndex = ({ data, location }) => {
  const posts = [] //data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="diego dorado" />
      <p className="spacey">Sometimes I feel like writing...</p>
      <section className="texts">
        {posts.map(({ node }) => {
          return (
            <article key={node.fields.slug}>
              <GatsbyImage image={node.frontmatter.cover.childImageSharp.gatsbyImageData} />
              <div className="text">
                <h3>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h3>
                <p>{node.frontmatter.description}</p>
              </div>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}

export default LogIndex
