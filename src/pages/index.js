import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import { useTranslation } from 'react-i18next'
import Layout from "../layouts/main"
import Link from "../components/link"

const Home = ({location}) => {
  const [, i18n] = useTranslation();
  const redirect = false
  useEffect(() => {
    if(redirect)
      navigate(`/${i18n.languages[0]}/work`)
  }, []);
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout location={location} >
        <p style={{textAlign: 'center'}} className="spacey">
          Subí una webapp para tocar junto a una maquina.
        </p>
        <p style={{textAlign: 'center'}}>
          <a style={{color: '#222'}}  href={`/human-aided-music/`} className="big-btn">a ver...</a>
        </p>
    </Layout>
  )

}



export default Home
