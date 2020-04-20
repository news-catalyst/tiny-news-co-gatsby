import React from "react"
import { graphql } from "gatsby"
import ArticleLayout from "../components/ArticleLayout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <ArticleLayout>
      <div className="article-container">
        <div className="article">
          <h1>{frontmatter.headline}</h1>
          <h2>{frontmatter.date}</h2>
          <h3>by {frontmatter.byline}</h3>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ArticleLayout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        byline
        headline
      }
    }
  }
`