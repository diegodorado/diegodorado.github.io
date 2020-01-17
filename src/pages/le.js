import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import { useTranslation } from 'react-i18next'
import Layout from "../layouts/main"

const Home = () => {
  const [, i18n] = useTranslation();
  useEffect(() => navigate(`/${i18n.languages[0]}/labs/live-emojing`), []);
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout></Layout>
  )

}

export default Home
