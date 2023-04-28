import React from 'react';
import { graphql } from 'gatsby';

import get from 'lodash/get';
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import { getArticleUrl } from '../utils/url';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';
import { BlogPostSchema, BlogPostMeta } from '../components/seo';
import Vote from '../components/vote';

import { article as articleRoot, heroImage as heroImageClass } from './blog-post.module.css';
import './prism-nord-theme.css';

class BlogPostTemplate extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata');
    const post = get(this.props, 'data.contentfulBlogPost');
    const heroImage = getImage(get(post, 'heroImage.gatsbyImageData', null));
    const lang = get(this.props, 'pageContext.lang', post.nodeLocale);
    const postId = get(post, 'contentful_id', null)

    return (
      <Layout location={this.props.location}>
        <div className={articleRoot}>
          <ArticleHeader
            article={post}
            directory={siteMeta.blogDirectory}
            isDetails
          />
          {heroImage && (
            <div className={heroImageClass}>
              <GatsbyImage alt={post.title} title={post.title} image={heroImage} />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
          <Vote id={postId} url={getArticleUrl(post, siteMeta)} />
        </div>
        <BlogPostMeta post={post} meta={siteMeta} lang={lang} directory={siteMeta.blogDirectory}  />
        <BlogPostSchema post={post} meta={siteMeta} />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

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
        gatsbyImageData
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
