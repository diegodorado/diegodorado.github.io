import React, { FC } from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

// htmlAttributes={{ lang, }}

type SeoProps = {
  title: string
}

const Seo: FC<SeoProps> = ({ title }) => {
  const { title: titlePrefix, description, image, siteUrl } = useSiteMetadata()

  const imageUrl = `${siteUrl}${image}`
  const fullTitle = `${titlePrefix} - ${title}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="og:title" content={fullTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
    </>
  )
}

export { Seo }
