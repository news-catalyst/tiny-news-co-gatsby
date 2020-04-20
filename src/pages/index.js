import React from "react"
import { graphql } from "gatsby"
import ArticleLayout from "../components/ArticleLayout"

export default ({ data }) => {
  console.log(data)

  return(
    <ArticleLayout>
      <h1>tiny news co</h1>
      <p>here is a list of {data.allMarkdownRemark.totalCount} articles created in the cms</p>

      <div>
        <ul>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <li key={index}><a href={node.fields.slug}>{node.frontmatter.headline}</a></li>
        ))}
        </ul>
      </div>
    </ArticleLayout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {headline: {ne: null}}}) {
      totalCount
      edges {
        node {
          fields{
            slug
          }
          frontmatter {
            headline
          }
        }
      }
    }
  }
`
