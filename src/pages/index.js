import { graphql } from 'gatsby'
import Home from './blog'

export default Home
export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        blogDirectory
      }
    }
    allContentfulBlogPostGlobal(filter: {localized: {title: {regex: "/^[a-zа-я0-9]/i"}}}) {
      group(field: postDate) {
        fieldValue
        edges {
          node {
            id
            localized {
              title
              slug
              tags
              sys {
                revision
              }
              publishDate(formatString: "MMMM Do, YYYY")
              updatedAt(formatString: "MMMM Do, YYYY")
              description {
                childMarkdownRemark {
                  html
                }
              }
              node_locale
            }
          }
        }
      }
    }
  }
`