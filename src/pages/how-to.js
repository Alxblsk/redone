import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import ArticlePreview from '../components/article-preview';

import { articleList, articleListItem } from './blog.module.css';

const HowToIndex = props => {
  const siteMeta = get(props, 'data.site.siteMetadata');
  const posts = get(props, 'data.allContentfulHowToPost.edges');

  return (
    <Layout location={props.location}>
      <ul className={articleList}>
        {posts.map(({ node }) => (
          <li className={articleListItem} key={node.slug}>
            <ArticlePreview
              article={node}
              directory={siteMeta.howToDirectory}
            />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default HowToIndex;

export function Head({ data }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const howToUrl = `${siteMeta.siteUrl}/${siteMeta.howToDirectory}/`;

  return (
    <>
      <title>{siteMeta.title}</title>
      <html lang="en-US" />
      <meta name="description" content={siteMeta.description} />
      <link rel="canonical" href={howToUrl} />
    </>
  );
}

export const pageQuery = graphql`
  query HowToIndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        howToDirectory
      }
    }
    allContentfulHowToPost(
      sort: { publishDate: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
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
          heroImage {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
