import React, { useEffect } from 'react'
import { navigate } from "gatsby"
import { useTranslation } from 'react-i18next'

const Home = () => {
  const [t, i18n] = useTranslation();
  useEffect(() => navigate(`/${i18n.language}/work`), []);
  return null
}

export default Home
