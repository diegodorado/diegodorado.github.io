/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'


const Footer = () => {

  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  //strange place to have the quotes...
  const data = i18n.quotes[i18n.languages[0]]
  const [quote, setQuote] = useState(data[0])

  useEffect(() => {
    const rand = Math.random()
    setQuote(data[Math.floor(rand*data.length)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <footer>
      <table>
        <tbody>
          <tr><td><cite>{quote[1]}</cite></td></tr>
          <tr><td><span>{quote[0]}</span></td></tr>
        </tbody>
      </table>
    </footer>)
}

export default Footer
