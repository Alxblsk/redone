import React from 'react'
import { graphql } from 'gatsby'

import get from 'lodash/get'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import ArticleHeader from '../components/article-header'
import { BlogPostSchema, BlogPostMeta } from '../components/seo'
import Commento from '../components/commento'

import styles from './blog-post.module.css'
import './prism-nord-theme.css'

class BlogPostTemplate extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata')
    const post = get(this.props, 'data.contentfulBlogPost')
    const postId = get(post, 'contentful_id', null)
    const heroImage = get(post, 'heroImage.fluid', null)

    return (
      <Layout location={this.props.location}>
        <div className={styles.article}>
          <ArticleHeader article={post} directory={siteMeta.blogDirectory} isDetails />
          {heroImage && (
            <div className={styles.heroImage}>
              <Img alt={post.title} title={post.title} fluid={heroImage} />
            </div>
          )}
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
        <Commento id={postId} />
        <BlogPostMeta post={post} meta={siteMeta} />
        <BlogPostSchema post={post} meta={siteMeta} />
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
        siteUrl
        blogDirectory
        username
        firstName
        lastName
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      tags
      contentful_id
      node_locale
      sys {
        revision
      }
      description {
        description
      }
      publishDate(formatString: "MMMM Do, YYYY")
      updatedAt(formatString: "MMMM Do, YYYY")
      publishDateUtc: publishDate
      updatedAtUts: updatedAt
      nodeLocale: node_locale
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
