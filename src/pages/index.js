import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import Link from "../components/link"
import { useTranslation } from 'react-i18next'
import Layout from "../layouts/main"
import SEO from "../components/seo"

const Home = ({location}) => {
  const [, i18n] = useTranslation();
  useEffect(() => {
    //navigate(`/${i18n.languages[0]}/work`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout location={location} >
      <SEO title="home" />
      <p style={{textAlign:'center'}}>
		Hola! Soy Diego Dorado, Live Coder, Programador y Artista electrónico argentino, y para la Twitter Residencia de IN-SONORA propuse que hagamos música con #emojis a través de twitter. 
        <br/>
		¿Cómo?
        <br/>
        Twiteá algunos 😛😍🔥😹 con el hastag #emojis y serán transformados por un bot.
        <br/>
			  <Link to={`/tw/`}> Mira como suenan estos tweets!</Link>
      </p>
    </Layout>
  )

}



export default Home
