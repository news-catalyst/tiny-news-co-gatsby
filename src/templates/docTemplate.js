import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({data: {doc}}) => (
  <>
    <Layout>
      <h1>{doc.document.name}</h1>
      <p>{doc.document.createdTime}</p>
      <div
          dangerouslySetInnerHTML={{__html: doc.childMarkdownRemark.html}}
      />
    </Layout>
  </>
)

export const pageQuery = graphql`
  query($path: String!) {
    googleDocs(document: {path: {eq: $path}}) {
        document {
            name
            createdTime
        }
        childMarkdownRemark {
            html
        }
    }
  }
`
