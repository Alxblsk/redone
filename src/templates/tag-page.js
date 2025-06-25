import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import { getPageDirectory } from '../utils/url';

const Tag = ({ data, pageContext, location }) => {
  const siteMeta = get(data, 'site.siteMetadata');
  const checkType = getPageDirectory(siteMeta);

  const blogTags = get(data, 'blogTags.group');
  const howToTags = get(data, 'howToTags.group');

  const tags = [...blogTags, ...howToTags].filter(
    (tag) => tag.fieldValue === pageContext.tag
  );

  return (
    <Layout location={location}>
      <div>
        <h2 className="h1">Articles found by tag "{pageContext.tag}"</h2>
        <ul>
          {(tags[0].nodes || []).map((article) => {
            const pageType = checkType(get(article, 'internal.type'));
            return (
              <li key={article.slug}>
                <Link to={`/${pageType}/${article.slug}/`}>
                  {article.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Tag;

export function Head({ data, pageContext }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const tagUrl = `${siteMeta.siteUrl}/${siteMeta.tagsDirectory}/${pageContext.slug}/`;
  
  return (
    <>
      <title>{siteMeta.title}</title>
      <html lang="en" />
      <meta name="description" content={siteMeta.description} />
      <link rel="canonical" href={tagUrl} />
    </>
  );
}

export const pageQuery = graphql`
  query TagQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        blogDirectory
        howToDirectory
        tagsDirectory
      }
    }
    howToTags: allContentfulHowToPost(filter: {node_locale: {eq: "en-US"}}) {
      group(field: {tags: SELECT}) {
        field
        fieldValue
        nodes {
          title
          slug
          internal {
            type
          }
        }
      }
    }
    blogTags: allContentfulBlogPost(filter: {node_locale: {eq: "en-US"}}) {
      group(field: {tags: SELECT}) {
        field
        fieldValue
        nodes {
          title
          slug
          internal {
            type
          }
        }
      }
    }
  }
`;