import React from "react"
import Link from "../link"
import Helmet from "react-helmet"
import Brand from "./brand"
import LanguagesLinks from "./languages-links"
import ThemeToggle from "./theme-toggle"
import SocialLinks from "./social-links"
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

const PLink = ({ className, ...rest }) => (
  <Link getProps={partiallyActive(className)} {...rest} />
)


const Header = ({location}) => {
  const [t, ] = useTranslation();

  return (
    <header>
      <Helmet meta={meta} />
      <Brand title="diego dorado" />
      <nav>
        <SocialLinks />
        <LanguagesLinks location={location}/>
        <ThemeToggle />
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
