import React from 'react';
import { graphql } from 'gatsby';

import get from 'lodash/get';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';
import { BlogPostSchema } from '../components/seo';

import { article } from './blog-post.module.css';
import './prism-nord-theme.css';

const HowToPostTemplate = (props) => {
  const siteMeta = get(props, 'data.site.siteMetadata');
  const post = get(props, 'data.contentfulHowToPost');
  const lang = get(props, 'pageContext.lang', post.nodeLocale);

  return (
    <Layout location={props.location}>
      <div className={article}>
        <ArticleHeader
          article={post}
          directory={siteMeta.howToDirectory}
          isDetails
        />
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>
    </Layout>
  );
};

export default HowToPostTemplate;

export function Head({ data, pageContext }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const post = get(data, 'contentfulHowToPost');
  const lang = get(pageContext, 'lang', post.nodeLocale);
  const postUrl = `${siteMeta.siteUrl}/${siteMeta.howToDirectory}/${post.slug}/`;

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
  query HowToPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        howToDirectory
        username
        firstName
        lastName
      }
    }
    contentfulHowToPost(slug: { eq: $slug }) {
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
