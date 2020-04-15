const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
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
      createPage({
        path: edge.node.fields.slug,
        component: articleTemplate,
        // additional data can be passed via context
        context: {},
      })
    })
  })
}