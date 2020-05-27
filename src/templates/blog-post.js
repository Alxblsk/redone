import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import get from 'lodash/get'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import ArticleHeader from '../components/article-header'
import Commento from '../components/commento'

import styles from './blog-post.module.css'
import './prism-nord-theme.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const postId = get(post, 'contentful_id', null)
    const heroImage = get(post, 'heroImage.fluid', null)
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <Helmet
          title={`${post.title} | ${siteTitle}`}
          htmlAttributes={{ lang: 'en' }}
        >
          <link rel="preconnect" href="https://cdn.commento.io"></link>
        </Helmet>
        <div className={styles.article}>
          <ArticleHeader article={post} isDetails />
          {heroImage && (
            <Img
              alt={post.title}
              title={post.title}
              fluid={post.heroImage.fluid}
            />
          )}
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
        <Commento id={postId} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      tags
      contentful_id
      sys {
        revision
      }
      publishDate(formatString: "MMMM Do, YYYY")
      updatedAt(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 640, background: "rgb:FFFFFF") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
