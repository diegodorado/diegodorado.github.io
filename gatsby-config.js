module.exports = {
  siteMetadata: {
    title: `diego dorado`,
    author: `Diego Dorado`,
    description: `diego dorado portfolio.`,
    siteUrl: `http://diegodorado.github.io/`,
    social: {
      twitter: `diegodorado`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
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
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: 'diegdorado',
        access_token: "EAAdxZC9ZCkPZBkBALlAxjmCmEXgs7LkphofDqqqZA95OdiUFCtewY6FFNRz3DqjzbX2xFz3fktHqQ2dujP5plK0Axh6DxjNe8Y7HzPbkyiwaY4v3sJCagx1B71lh7FQ2SZBtxLqOld0QbVSVJnYlJuJE2sInW4rMrL768VhsqQaLlFR2ZCilSbMAE21SGGaycZD",
        instagram_id: "17841404423342614",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
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
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
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
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
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
  ],
}
