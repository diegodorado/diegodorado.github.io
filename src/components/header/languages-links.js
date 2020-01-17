import React from "react"
import { navigate } from "gatsby"
import { useTranslation } from 'react-i18next'

const LanguagesLinks = ({location}) => {

  const [, i18n] = useTranslation();

  const onChangeLanguageClick = e => {
    e.preventDefault()
    const prevlang = i18n.languages[0]
    //avoid toggle if active lang was clicked
    if(prevlang===e.target.text)
      return

    i18n.changeLanguage(i18n.languages[0]==='es'?'en':'es')
    const pathname = location.pathname.replace(`/${prevlang}/`,`/${i18n.languages[0]}/`)
    navigate(pathname)
  }

  return (
    <>
      <a href="/" onClick={onChangeLanguageClick} className={i18n.languages[0]==='es'?'active':''}>es</a>/
      <a href="/" onClick={onChangeLanguageClick} className={i18n.languages[0]==='en'?'active':''}>en</a>
    </>
  )

}

export default LanguagesLinks
