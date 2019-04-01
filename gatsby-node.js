const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const workPost = path.resolve(`./src/templates/work-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          filter:{fileAbsolutePath:{regex:"/.*index.md/"}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                type
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

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(p => p.node.fields.type==="blog")
    const works = result.data.allMarkdownRemark.edges.filter(p => p.node.fields.type==="works")

    works.forEach((work, index) => {
      const previous = index === works.length - 1 ? null : works[index + 1].node
      const next = index === 0 ? null : works[index - 1].node
      createPage({
        path: work.node.fields.slug,
        component: workPost,
        context: {
          slug: work.node.fields.slug,
          previous,
          next,
        },
      })
    })


    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })



  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    //guess the node type from its folder
    let path = node.fileAbsolutePath
    path = path.replace(`${__dirname}/content/`,'')
    path = path.split('/')[0]
    let slug = createFilePath({ node, getNode })
    slug = `/${path}${slug}`
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    createNodeField({
      name: `type`,
      node,
      value: path,
    })

  }
}

/*
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  if(page.path=== '/live-emojing/' || page.path==='/offline-plugin-app-shell-fallback/'|| page.path==='/404/'){
    console.log('live emojing')
    createPage(page)
  }
}
*/
