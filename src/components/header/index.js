import React, {useState, useEffect} from "react"
import { navigate } from "gatsby"
import Link from "../link"
import Helmet from "react-helmet"
import Brand from "./brand"
import { useTranslation } from 'react-i18next'

const meta = [
  {
    name: `viewport`,
    content: `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`,
  },
  {
    name: `theme-color`,
    content: `#ff0000`,
  },
  {
    name: `msapplication-navbutton-color`,
    content: `#ff0000`,
  },
  {
    name: `apple-mobile-web-app-status-bar-style`,
    content: `#ff0000`,
  },
]


const partiallyActive = className => ({ isPartiallyCurrent }) => ({
  className: `${className?className:''} ${isPartiallyCurrent ? 'active': ''}`,
})




const Header = ({location}) => {


  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark',
  )

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  const [t, i18n] = useTranslation();

  const onChangeThemeClick = e => {
    e.preventDefault()
    setTheme((theme==='dark') ? 'light' : 'dark')
  }

  const onChangeLanguageClick = e => {
    e.preventDefault()
    const prevlang = i18n.languages[0]
    i18n.changeLanguage(i18n.languages[0]==='es'?'en':'es')
    const pathname = location.pathname.replace(`/${prevlang}/`,`/${i18n.languages[0]}/`)
    navigate(pathname)
  }

  const PLink = ({ className, ...rest }) => (
    <Link getProps={partiallyActive(className)} {...rest} />
  )

  return (
    <header>
      <Helmet bodyAttributes={{class:theme }}  meta={meta} />
      <Brand title="diego dorado" />
      <nav>
        <a href="/" onClick={onChangeLanguageClick} className={i18n.languages[0]==='es'?'active':''}>es</a>/
        <a href="/" onClick={onChangeLanguageClick} className={i18n.languages[0]==='en'?'active':''}>en</a>
        <a title="change theme color" href="/" onClick={onChangeThemeClick}><span>◐</span></a>
        <br/>
        <PLink to={`/work`}>{t('Work')}</PLink>
        |<PLink to={`/music`}>{t('Music')}</PLink>
        |<PLink className="labs" to={`/labs`} >
          <i>L</i>
          <i>a</i>
          <i>b</i>
          <i>s</i>
          </PLink>
        |<PLink to={`/pics`}>{t('Pics')}</PLink>
        |<PLink to={`/bio`}>{t('Bio')}</PLink>
        {/* | <PLink to={`/log`}>Log</PLink>*/}
      </nav>
    </header>
  )

}

export default Header
