import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

import styles from './blog.module.css'

class BlogIndex extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const blogUrl = `${siteMeta.siteUrl}/${siteMeta.blogDirectory}/`

    return (
      <Layout location={this.props.location}>
        <Helmet
          title={siteMeta.title}
          description={siteMeta.description}
          htmlAttributes={{ lang: 'en' }}
        >
          <link rel="preload" href="https://cdn.commento.io"></link>
          <link rel="canonical" href={blogUrl}></link>
        </Helmet>
        <ul className={styles.articleList}>
          {posts.map(({ node }) => (
            <li className={styles.articleListItem} key={node.slug}>
              <ArticlePreview article={node} />
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
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
