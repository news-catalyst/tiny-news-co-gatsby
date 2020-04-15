const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  console.log(node.internal.type)
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `GoogleDocs`) {
    console.log(node)
    const slug = createFilePath({ node, getNode, basePath: `articles` })
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: `/articles${slug}`,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  graphql(
    `
        {
            allGoogleDocs {
                nodes {
                    document {
                        path
                    }
                }
            }
        }
    `
  ).then(result => {
      result.data.allGoogleDocs.nodes.forEach(({document}, index) => {
        console.log(index, " => ", document.path)

          actions.createPage({
              path: document.path,
              component: path.resolve(`./src/templates/docTemplate.js`),
          })
      })
  })

  return graphql(`
  {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const articles = result.data.allMarkdownRemark.edges
    const articleTemplate = path.resolve(`src/templates/articleTemplate.js`)

    articles.forEach(edge => {
      if (edge && edge.node && edge.node.fields && edge.node.fields.slug) {
        createPage({
          path: edge.node.fields.slug,
          component: articleTemplate,
          // additional data can be passed via context
          context: {},
        })
      } else {
        console.log("not making a page without a slug for edge node: ", edge.node)
      }
    })
  })
}