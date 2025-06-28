import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import { getPageDirectory } from '../utils/url';
import { SiteData } from '../types';

interface TagPageData {
  site: SiteData;
  howToTags: {
    group: Array<{
      field: string;
      fieldValue: string;
      nodes: Array<{
        title: string;
        slug: string;
        internal: {
          type: string;
        };
      }>;
    }>;
  };
  blogTags: {
    group: Array<{
      field: string;
      fieldValue: string;
      nodes: Array<{
        title: string;
        slug: string;
        internal: {
          type: string;
        };
      }>;
    }>;
  };
}

interface TagPageProps {
  data: TagPageData;
  pageContext: {
    tag: string;
    slug: string;
  };
  location: {
    pathname: string;
    search: string;
    hash: string;
    href: string;
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
  };
}

const Tag: React.FC<TagPageProps> = ({ data, pageContext, location }) => {
  const siteMeta = get(data, 'site.siteMetadata');
  const checkType = getPageDirectory(siteMeta);

  const blogTags = get(data, 'blogTags.group');
  const howToTags = get(data, 'howToTags.group');

  const tags = [...blogTags, ...howToTags].filter(
    tag => tag.fieldValue === pageContext.tag
  );

  return (
    <Layout location={location}>
      <div>
        <h2 className="h1">Articles found by tag "{pageContext.tag}"</h2>
        <ul>
          {(tags[0]?.nodes || []).map(article => {
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

export function Head({ data, pageContext }: { data: TagPageData; pageContext: { slug: string } }) {
  const siteMeta = get(data, 'site.siteMetadata');
  
  if (!siteMeta) {
    return null;
  }
  
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
    howToTags: allContentfulHowToPost(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      group(field: { tags: SELECT }) {
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
    blogTags: allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
      group(field: { tags: SELECT }) {
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