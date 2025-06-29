import React from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/layout';

import { tagsGroup, tagItem } from './tags.module.css';

const TagsLayout = ({ title, tags, tagsUrl }) => {
  return (
    <div className={tagsGroup}>
      <h2 className={`h1`}>{title}</h2>
      <div>
        {(tags || []).map(tag => {
          return (
            <div className={tagItem} key={tag.fieldValue}>
              <Link to={`/${tagsUrl}/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue}
              </Link>
              &nbsp;
              <sup>({tag.totalCount})</sup>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Tags = props => {
  const siteMeta = get(props, 'data.site.siteMetadata');
  const blogTags = get(props, 'data.blogTags.group');
  const howToTags = get(props, 'data.howToTags.group');

  return (
    <Layout location={props.location}>
      <TagsLayout
        title="Blog Tags"
        tags={blogTags}
        tagsUrl={siteMeta.tagsDirectory}
      />
      <TagsLayout
        title="How to Tags"
        tags={howToTags}
        tagsUrl={siteMeta.tagsDirectory}
      />
    </Layout>
  );
};

export default Tags;

export function Head({ data }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const tagsUrl = `${siteMeta.siteUrl}/${siteMeta.tagsDirectory}/`;

  return (
    <>
      <title>{siteMeta.title}</title>
      <html lang="en-US" />
      <meta name="description" content={siteMeta.description} />
      <link rel="canonical" href={tagsUrl} />
    </>
  );
}

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        tagsDirectory
      }
    }
    howToTags: allContentfulHowToPost(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      group(field: { tags: SELECT }) {
        totalCount
        fieldValue
      }
    }
    blogTags: allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
      group(field: { tags: SELECT }) {
        totalCount
        fieldValue
      }
    }
  }
`;
