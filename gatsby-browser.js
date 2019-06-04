import "./src/styles/app.sass"
require("prismjs/themes/prism-tomorrow.css")

/*
export const onRouteUpdate = ({ location, action }) => {
}
*/

// forces to use https on production
export const onClientEntry = () => {
  if (typeof window !== 'undefined'
        && window.location.hostname !== 'localhost'
        && process.env.NODE_ENV==='production'
        && window.location.protocol==='http:') {
      const newUrl = window.location.href.replace('http:','https:')
      window.location.replace(newUrl)
  }
}

/*
export const shouldUpdateScroll = (a) => {
  return false
}
*/
