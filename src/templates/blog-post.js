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
    const siteMeta = get(this.props, 'data.site.siteMetadata')

    const post = get(this.props, 'data.contentfulBlogPost')
    const postId = get(post, 'contentful_id', null)
    const postDescription = get(post, 'description.description', null)
    const postUrl = `${siteMeta.siteUrl}/${siteMeta.blogDirectory}/${post.slug}/`;

    const heroImage = get(post, 'heroImage.fluid', null)

    return (
      <Layout location={this.props.location}>
        <Helmet
          title={`${post.title} | ${siteMeta.title}`}
          description={postDescription}
          htmlAttributes={{ lang: "en", prefix: "og: http://ogp.me/ns#" }}
        >
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content={`@${siteMeta.username}`} />
          {heroImage && <meta name="twitter:image" content={heroImage.src} />}

          <meta property="og:title" content={`${post.title}`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={postUrl} />
          {heroImage && <meta property="og:image" content={heroImage.src} />}
          <meta property="og:description" content={postDescription} />
          <meta property="profile:first_name" content={siteMeta.firstName} />
          <meta property="profile:last_name" content={siteMeta.lastName} />
          <meta property="profile:username" content={siteMeta.username} />

          <link rel="canonical" href={postUrl}></link>
          <link rel="preconnect" href="https://cdn.commento.io"></link>
        </Helmet>
        <div className={styles.article}>
          <ArticleHeader article={post} isDetails />
          {heroImage && (
            <Img
              alt={post.title}
              title={post.title}
              fluid={heroImage}
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
        title,
        siteUrl,
        blogDirectory,
        username,
        firstName,
        lastName
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
      description {
        description
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
