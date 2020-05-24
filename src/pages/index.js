import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import Link from "../components/link"
import { useTranslation } from 'react-i18next'
import Layout from "../layouts/main"
import SEO from "../components/seo"

const Home = ({location}) => {
  const [, i18n] = useTranslation();
  useEffect(() => {
    navigate(`/${i18n.languages[0]}/work`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout location={location} >
      <SEO title="home" />
      <p style={{textAlign:'center'}}>
      </p>
    </Layout>
  )

}



export default Home
