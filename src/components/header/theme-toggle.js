import React, {useState, useEffect} from "react"
import Helmet from "react-helmet"
import { useTranslation } from 'react-i18next'
import {reactLocalStorage} from 'reactjs-localstorage'

const ThemeToggle = () => {

  const [theme, setTheme] = useState('dark')

  useEffect(() => setTheme(reactLocalStorage.get('theme', 'dark')), [])

  useEffect(() => {
    reactLocalStorage.set('theme', theme);
  }, [theme])

  const [t, i18n] = useTranslation();

  const onChangeThemeClick = e => {
    e.preventDefault()
    setTheme((theme==='dark') ? 'light' : 'dark')
  }

  return (
    <>
    <Helmet bodyAttributes={{class:theme }}  />
    <a title="change theme color" href="/" onClick={onChangeThemeClick}><span>◐</span></a>
    </>
  )

}

export default ThemeToggle
