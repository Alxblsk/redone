import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import ArticlePreview from '../components/article-preview';

import { articleList, articleListItem  } from './blog.module.css';

class HowToIndex extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata');
    const posts = get(this, 'props.data.allContentfulHowToPost.edges');
    const howToUrl = `${siteMeta.siteUrl}/${siteMeta.howToDirectory}/`;

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteMeta.title} htmlAttributes={{ lang: 'en-US' }}>
          <meta name="description" content={siteMeta.description} />
          <link rel="canonical" href={howToUrl}></link>
        </Helmet>
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
  }
}

export default HowToIndex;

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
      sort: {publishDate: DESC}
      filter: {node_locale: {eq: "en-US"}}
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
