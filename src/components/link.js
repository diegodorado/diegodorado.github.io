import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { useTranslation } from "react-i18next"

const Link = ({ to, ...props }) => {
  const [, i18n] = useTranslation()
  return <GatsbyLink {...props} to={`/${i18n.languages[0]}${to}`} />
}

export default Link
