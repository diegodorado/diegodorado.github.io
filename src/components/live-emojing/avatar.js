import React, {useState, useEffect, useContext} from "react"
import {reactLocalStorage} from 'reactjs-localstorage'
import LiveEmojingContext from './context.js'
import {useTranslation } from 'react-i18next'

const Avatar = () =>{
  const [t, ] = useTranslation();
  const context = useContext(LiveEmojingContext)
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [understandsAvatarClick, setUnderstandsAvatarClick] = useState(false)

  useEffect(()=>{
    const url = reactLocalStorage.get('avatarUrl', '')
    changeAvatarUrl(url)
    const understands = (reactLocalStorage.get('understandsAvatarClick', 'false')==='true')
    setUnderstandsAvatarClick(understands)
  },[])

  const changeAvatarUrl = (url) => {
    // get a random url if none provided
    if(!url){
      const randomId = Math.floor(Math.random()*10000)
      url =`https://api.adorable.io/avatars/200/${randomId}`
    }

    setLoadingAvatar(true)
    const img = new Image()
    img.onload = () => {
      reactLocalStorage.set('avatarUrl', url)
      context.setAvatarUrl(url)
      setLoadingAvatar(false)
    }
    img.src = url
  }


  const onChangeAvatar = (e) => {
    if(loadingAvatar)
      return

    changeAvatarUrl()
    //hides help and save setting
    reactLocalStorage.set('understandsAvatarClick', true)
    setUnderstandsAvatarClick(true)
  }


  return (
    <p><img alt="" width={150} height={150} src={context.avatarUrl} onClick={onChangeAvatar} className={`${ loadingAvatar ? 'loading' : '' } ${(!understandsAvatarClick)?'pulse':''}  avatar`}/></p>
  )

}


export default Avatar
