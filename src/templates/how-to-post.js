import React from 'react';
import { graphql } from 'gatsby';

import get from 'lodash/get';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';
import { BlogPostSchema, BlogPostMeta } from '../components/seo';

import { article } from './blog-post.module.css';
import './prism-nord-theme.css';

class HowToPostTemplate extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata');
    const post = get(this.props, 'data.contentfulHowToPost');
    const lang = get(this.props, 'pageContext.lang', post.nodeLocale);

    return (
      <Layout location={this.props.location}>
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
        <BlogPostMeta post={post} meta={siteMeta} lang={lang} directory={siteMeta.howToDirectory}/>
        <BlogPostSchema post={post} meta={siteMeta} />
      </Layout>
    );
  }
}

export default HowToPostTemplate;

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
