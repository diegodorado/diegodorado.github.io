import React from "react"
import CV2612 from "../apps/cv2612/"
import Layout from "../layouts/main"

const App = ({ location }) => (
  <Layout location={location} bodyClass="cv2612">
    <CV2612 />
  </Layout>
)

export default App
