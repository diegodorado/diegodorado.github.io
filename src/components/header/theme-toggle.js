/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useContext} from "react"
import {FaAdjust} from 'react-icons/fa'
import {GlobalContext} from "../context"

const ThemeToggle = () => {
  const { dispatch } = useContext(GlobalContext)

  const onChangeThemeClick = e => {
    e.preventDefault()
    dispatch({ type: "toggle-theme"})
  }

  return <a title="change theme color" href="/" onClick={onChangeThemeClick}><FaAdjust/></a>

}

export default ThemeToggle
