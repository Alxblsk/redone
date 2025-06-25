import React, { useState } from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import classNames from 'classnames';

import Layout from '../components/layout';
import ArticlePreview from '../components/article-preview';

import { articleListItem, articleListItemLangs, articleListLanguageSwitch, activeLang, articleLocalizedGroup, articleList } from './blog.module.css';

const LANGUAGE_MAP = {
  'en-US': 'En',
  'ru-RU': 'Ру',
};

function getAvailableLocales(posts) {
  return posts.map((post) => post.node.localized.node_locale);
}

function sortPosts(groups) {
  return groups.sort(
    (a, b) =>
      new Date(b.fieldValue).getTime() - new Date(a.fieldValue).getTime()
  );
}

function Article({ posts, directory }) {
  const locales = getAvailableLocales(posts);
  const [lang, setLang] = useState(
    locales.includes('en-US') ? 'en-US' : locales[0]
  );
  return (
    <li className={articleListItem}>
      <div className={articleListItemLangs}>
        {locales.map((locale) => (
          <button
            type="button"
            className={classNames(
              articleListLanguageSwitch,
              locale === lang && activeLang
            )}
            key={locale}
            onClick={() => setLang(locale)}
          >
            {LANGUAGE_MAP[locale]}
          </button>
        ))}
      </div>
      <ul className={articleLocalizedGroup} data-selected-lang={lang}>
        {posts.map((post) => {
          const node = post.node.localized;
          return node ? (
            <li
              key={node.slug}
              lang={node.node_locale}
            >
              <ArticlePreview article={node} directory={directory} />
            </li>
          ) : null;
        })}
      </ul>
    </li>
  );
}

class BlogIndex extends React.Component {
  render() {
    const siteMeta = get(this.props, 'data.site.siteMetadata');
    const groups = sortPosts(
      get(this.props, 'data.allContentfulBlogPostGlobal.group', [])
    );

    return (
      <Layout location={this.props.location}>
        <ul className={articleList}>
          {groups.map((group) => {
            const posts = group.edges;
            return (
              <Article
                posts={posts}
                directory={siteMeta.blogDirectory}
                key={group.fieldValue}
              />
            );
          })}
        </ul>
      </Layout>
    );
  }
}

export default BlogIndex;

export function Head({ data }) {
  const siteMeta = get(data, 'site.siteMetadata');
  const blogUrl = `${siteMeta.siteUrl}/${siteMeta.blogDirectory}/`;
  
  return (
    <>
      <title>{siteMeta.title}</title>
      <html lang="en-US" />
      <meta name="description" content={siteMeta.description} />
      <link rel="canonical" href={blogUrl} />
    </>
  );
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        blogDirectory
      }
    }
    allContentfulBlogPostGlobal(
      filter: {localized: {title: {regex: "/^[a-zа-я0-9]/i"}}}
    ) {
      group(field: {postDate: SELECT}) {
        fieldValue
        edges {
          node {
            id
            localized {
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
              node_locale
            }
          }
        }
      }
    }
  }
`;