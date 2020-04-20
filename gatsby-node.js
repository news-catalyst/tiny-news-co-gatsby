const _ = require('lodash')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // generate a slug for any markdown file with a headline
  if (node.internal.type === `MarkdownRemark`) {
    if (node.frontmatter) {
      let slug = createFilePath({ node, getNode, basePath: `articles` })
      // use a path if set in the cms
      if (node.frontmatter.path !== undefined) {
        slug = node.frontmatter.path
      }
      console.log("Using slug for article: ", slug)
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
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
          frontmatter {
            tags
            path
            headline
            templateKey
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
      if (edge.node.fields && edge.node.fields.slug && edge.node.frontmatter.headline !== null) {
        console.log("creating page: ", edge.node.fields.slug)
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: articleTemplate,
          // additional data can be passed via context
          context: {},
        })
      } else if (edge.node.frontmatter.path !== null && edge.node.frontmatter.templateKey !== null) {
        console.log("creating page: ", edge.node.frontmatter.path)
        const id = edge.node.id
        createPage({
          path: edge.node.frontmatter.path,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        })
      } else {
        console.log("not sure what to do with: ", edge.node)
      }
    })
    // Tag pages:
    let tags = []
    // Iterate through each article, putting all found tags into `tags`
    articles.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

  })
  .catch((err) => {
    console.log(err)
  })

}