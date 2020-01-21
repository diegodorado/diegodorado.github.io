import React, {useState, useEffect} from "react"
import Helmet from "react-helmet"
import {reactLocalStorage} from 'reactjs-localstorage'
import {FaAdjust} from 'react-icons/fa'

const ThemeToggle = () => {

  const [theme, setTheme] = useState('dark')

  useEffect(() => setTheme(reactLocalStorage.get('theme', 'dark')), [])

  useEffect(() => {
    reactLocalStorage.set('theme', theme);
  }, [theme])

  const onChangeThemeClick = e => {
    e.preventDefault()
    setTheme((theme==='dark') ? 'light' : 'dark')
  }

  return (
    <>
    <Helmet bodyAttributes={{class:theme }}  />
    <a title="change theme color" href="/" onClick={onChangeThemeClick}><FaAdjust/></a>
    </>
  )

}

export default ThemeToggle
