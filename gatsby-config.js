var proxy = require("http-proxy-middleware")
require('dotenv').config()

module.exports = {
/*  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  */
  siteMetadata: {
    langs: ['en','es'],
    title: `diego dorado`,
    author: `Diego Dorado`,
    description: `diego dorado portfolio.`,
    siteUrl: `http://diegodorado.com/`,
    social: {
      twitter: `diegodorado`,
    },
  },
  plugins: [
    'gatsby-plugin-workerize-loader',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/cv`,
        name: `cv`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77,
              related: false,
              noIframeBorder: true
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
          resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '¬',
              aliases: {tidal:"haskell"},
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-135987530-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `diego dorado`,
        short_name: `diego dorado`,
        start_url: `/`,
        background_color: `#222222`,
        theme_color: `#dddddd`,
        display: `minimal-ui`,
        icon: `src/favicon.png`,
      },
    },
    //`gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
    //'gatsby-plugin-preload-link-crossorigin',
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inconsolata\:400,700`
        ]
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-favicon`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
