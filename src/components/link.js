import React from "react"
import { Link as GatsbyLink, navigate as gatsbyNavigate } from "gatsby"
import { useTranslation } from 'react-i18next'

const Link = ({ to, ...props }) => {
  const [t, i18n] = useTranslation();
  return <GatsbyLink {...props} to={`/${i18n.language}${to}`} />
}

export default Link

/*

export const navigate = (to, options) => {
  if (typeof window === "undefined") {
    return
  }

  const { language, routed } = window.___gatsbyIntl
  const link = routed ? `/${language}${to}` : `${to}`
  gatsbyNavigate(link, options)
}

export const changeLocale = (language, to) => {
  if (typeof window === "undefined") {
    return
  }

  const removeLocalePart = pathname => {
    const { routed } = window.___gatsbyIntl
    if (!routed) {
      return pathname
    }
    const i = pathname.indexOf(`/`, 1)
    return pathname.substring(i)
  }

  const pathname = to || removeLocalePart(window.location.pathname)
  // TODO: check slash
  const link = `/${language}${pathname}${window.location.search}`
  localStorage.setItem("gatsby-intl-language", language)
  gatsbyNavigate(link)
}
*/
