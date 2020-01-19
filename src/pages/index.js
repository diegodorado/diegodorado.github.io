import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import { useTranslation } from 'react-i18next'
import Layout from "../layouts/main"

const Home = ({location}) => {
  const [, i18n] = useTranslation();
  useEffect(() => {
    navigate(`/${i18n.languages[0]}/work`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout location={location} >
    </Layout>
  )

}



export default Home
