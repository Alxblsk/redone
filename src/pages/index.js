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
