import React from "react"
import Layout from "../layouts/cv2612"
import SEO from "../components/seo"
import Device from "../components/cv2612/device"


class CV2612Index extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} >
        <SEO title="cv2612" />
        <Device />
      </Layout>
    )
  }
}

export default CV2612Index
