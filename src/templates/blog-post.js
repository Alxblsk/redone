import React from 'react';
import { graphql } from 'gatsby';

import get from 'lodash/get';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';

import { getArticleUrl } from '../utils/url';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';
import Vote from '../components/vote';
import { BlogPostSchema } from '../components/seo';

import {
  article as articleRoot,
  heroImage as heroImageClass,
} from './blog-post.module.css';
import './prism-nord-theme.css';

const BlogPostTemplate = (props) => {
  const siteMeta = get(props, 'data.site.siteMetadata');
  const post = get(props, 'data.contentfulBlogPost');
  const heroImage = getImage(get(post, 'heroImage.gatsbyImageData', null));
  const lang = get(props, 'pageContext.lang', post.nodeLocale);
  const postId = get(post, 'contentful_id', null);

  return (
    <Layout location={props.location}>
      <div className={articleRoot}>
        <ArticleHeader
          article={post}
          directory={siteMeta.blogDirectory}
          isDetails
        />
        {heroImage && (
          <div className={heroImageClass}>
            <GatsbyImage
              alt={post.title}
              title={post.title}
              image={heroImage}
            />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
        <Vote id={postId} url={getArticleUrl(post, siteMeta)} />
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export function Head({ data, pageContext }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const post = get(data, 'contentfulBlogPost');
  const lang = get(pageContext, 'lang', post.nodeLocale);
  const postUrl = `${siteMeta.siteUrl}/${siteMeta.blogDirectory}/${post.slug}/`;

  return (
    <>
      <title>{`${post.title} | ${siteMeta.title}`}</title>
      <html lang={lang} />
      <meta name="description" content={post.description?.description} />
      <meta property="og:title" content={post.title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:description" content={post.description?.description} />
      <meta name="x:card" content="summary" />
      <meta name="x:creator" content={`@${siteMeta.username}`} />
      <link rel="canonical" href={postUrl} />
      <BlogPostSchema post={post} siteMeta={siteMeta} postUrl={postUrl} />
    </>
  );
}

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
