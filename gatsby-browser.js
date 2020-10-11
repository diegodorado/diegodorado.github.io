
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

//maybe not needed
export const onServiceWorkerUpdateFound = () => {
  if (
    window.confirm(
      "This site has been updated with new data. Do you wish to reload the site to get the new data?"
    )
  ) {
    window.location.reload(true);
  }
};

export const onServiceWorkerUpdateReady= () => window.location.reload(true);

/*
export const shouldUpdateScroll = (a) => {
  return false
}
*/
