const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const locales = ['en','es']
const defaultLocale = 'en'

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const workPost = path.resolve(`./src/templates/work-post.js`)


  // I just use this array to create pagination, which  works with unlocalized
  // slug, so it makes no difference if I filter by 'en'
  return graphql(
    `
      {
        allMarkdownRemark(filter:{fields:{ locale: {in:["es",""]}, type:{eq:"works"},index:{eq:true}}} sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // an array of main article slugs
    const main_works = result.data.allMarkdownRemark.edges.map(p => p.node.fields.slug)


    return graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                  type
                  locale
                  index
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        throw result.errors
      }

      const works = result.data.allMarkdownRemark.edges.filter(p => p.node.fields.type==="works")

      works.forEach((work, index) => {

        // Use the fields created in exports.onCreateNode
        const {locale,slug} = work.node.fields

        // get the corresponding slug
        const i = main_works.reduce((acc, cur, idx) => slug.startsWith(cur) ? idx : acc,0)

        const previous = i === main_works.length - 1 ? null : main_works[i + 1]
        const next = i === 0 ? null : main_works[i - 1]

        const generatePage = (locale) => {
          createPage( {
            path: `/${locale}${slug}`,
            component: workPost,
            context: {
              slug,
              locale,
              locales,
              previous,
              next,
            }
          })
        }

        if(locale===''){
          // duplicate one page for each locale
          locales.forEach(locale => {
            generatePage(locale)
          })
        } else{
          generatePage(locale)
        }

      })


    })
  })
}




// As you don't want to manually add the correct languge to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // Use path.basename
    const name = path.basename(node.fileAbsolutePath, `.md`)

    //check if article is localized or not
    const localized = name.indexOf(`.`) !== -1
    // Files are defined with "name-with-dashes.lang.md"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If not localized, pass empty string for that
    const lang = localized ? name.split(`.`)[1] : ''
    let slug = '/works'+createFilePath({ node, getNode })

    if(localized){
      //remove .lang and index.lang from slug
      slug = slug.replace(`.${lang}`,'')
      slug = slug.replace(`/index`,'')
    }


    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `slug`,value: slug})
    //hardcoded article type
    createNodeField({ node, name: `type`,value: `works`})
    createNodeField({ node, name: `index`,value: name.startsWith('index')})

  }
}



exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const generatePage = (locale) => {
    return {
      ...page,
      path: `/${locale}${page.path}`,
      context: {
        ...page.context,
        locale,
        locales,
        originalPath: page.path,
      },
    }
  }

  if (['/','/dev-404-page/','/404/','/404.html'].includes(page.path)) {
    return
  }


  deletePage(page)

  //check if article is localized or not
  const localized = page.path.indexOf(`.`) !== -1
  // Files are defined with "name-with-dashes.lang.js"
  // name returns "name-with-dashes.lang"
  // So grab the lang from that string
  if(localized){
    const [page_path, locale] = page.path.split(`.`)
    page.path = page_path + '/'
    const localePage = generatePage(locale.replace('/',''))
    createPage(localePage)
  } else{
    // duplicate one page for each locale
    locales.forEach(l => {
      const localePage = generatePage(l)
      createPage(localePage)
    })
  }


}
