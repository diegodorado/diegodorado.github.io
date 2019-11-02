import React from "react"
import {FaYoutube, FaGithub, FaInstagram, FaFacebook} from 'react-icons/fa'

const SocialLinks = () => (
  <>
    <a target="_blank" href={`https://youtube.com/diegodorado`}><FaYoutube /></a>
    <a target="_blank" href={`https://instagram.com/diegdorado/`}><FaInstagram /></a>
    <a target="_blank" href={`http://facebook.com/diegdorado`}><FaFacebook /></a>
    <a target="_blank" href={`https://github.com/diegodorado`}><FaGithub /></a>
  </>
)

export default SocialLinks
