import React, { FC, useEffect } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { navigate } from 'gatsby'
//import Link from "../components/link"
import { useTranslation } from 'react-i18next'
import Layout from '../layouts/main'
import { SEO } from '../components/seo'

const Home: FC<PageProps> = ({ location }) => {
  const [, i18n] = useTranslation()
  useEffect(() => {
    // navigate(`/${i18n.languages[0]}/work`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //return empty layout instead of null to avoid FOUC
  return (
    <Layout location={location}>
      <p style={{ textAlign: 'center' }}>hola</p>
    </Layout>
  )
}

export default Home

export const Head: HeadFC = () => <SEO title="home" />
