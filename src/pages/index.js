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
    allContentfulBlogPostGlobal(filter: {node_locale: {eq: "en-US"}}, sort: {fields: [localized___publishDate], order: DESC}) {
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
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
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
        }
      }
    }
  }
`
