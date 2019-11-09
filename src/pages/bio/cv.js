import React from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import { graphql } from "gatsby"

const CvIndex = props => {
  const cv = props.data.markdownRemark
  return (
      <Layout location={props.location} >
      <SEO title="bio" />
      <div className="cv" dangerouslySetInnerHTML={{ __html: cv.html }} />
      <p className="spacey">
        Download: <a target="_blank" href={`/es/cv-diego-dorado.pdf`}>pdf</a>
      </p>
    </Layout>
  )
}

export default CvIndex

export const pageQuery = graphql`
  query Cv($locale: String!) {
    markdownRemark(fields:{ locale:{in:[$locale,""]}, slug:{eq:"/cv/cv/"}}) {
      html
    }
  }
`
