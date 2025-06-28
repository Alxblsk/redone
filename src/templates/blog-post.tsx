import React from 'react';
import { graphql } from 'gatsby';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { BlogPostTemplateProps } from '../types';
import { getArticleUrl } from '../utils/url';

import Layout from '../components/layout';
import ArticleHeader from '../components/article-header';
import Vote from '../components/vote';
import { BlogPostSchema } from '../components/seo';

import * as styles from './blog-post.module.css';
import './prism-nord-theme.css';

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = (props) => {
  const siteMeta = props.data.site.siteMetadata;
  const post = props.data.contentfulBlogPost;
  const heroImage = getImage(post.heroImage?.gatsbyImageData || null);
  const postUrl = getArticleUrl(post, siteMeta);

  return (
    <Layout location={props.location}>
      <article className={styles.article}>
        <ArticleHeader
          article={post}
          directory={siteMeta.blogDirectory}
          isDetails
        />
        {heroImage && (
          <GatsbyImage
            className={styles.heroImage}
            image={heroImage}
            alt={post.title}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
        <Vote id={post.slug} url={postUrl} />
      </article>
      <BlogPostSchema
        post={post}
        siteMeta={siteMeta}
        postUrl={postUrl}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        blogDirectory
        firstName
        lastName
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      description {
        description
      }
      publishDate(formatString: "MMMM Do, YYYY")
      publishDateUtc: publishDate
      updatedAt(formatString: "MMMM Do, YYYY")
      updatedAtUts: updatedAt
      nodeLocale: node_locale
      tags
      slug
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