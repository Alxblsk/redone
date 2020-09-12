import React from "react"
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase';

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'

import styles from './tags.module.css'

const TagsLayout = ({ title, tags, tagsUrl }) => {
  return (
    <div className={styles.tagsGroup}>
      <h2 className={`h1 ${styles.title}`}>{title}</h2>
      <div className={styles.tagsList}>
        {
          (tags || []).map(tag => {
            return (
              <div className={styles.tagItem} key={tag.fieldValue}>
                <Link to={`/${tagsUrl}/${kebabCase(tag.fieldValue)}/`}>{tag.fieldValue}</Link>
                &nbsp;
                <sup>({tag.totalCount})</sup>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Tags = (props) => {
  const siteMeta = get(props, 'data.site.siteMetadata')
  const blogTags = get(props, 'data.blogTags.group')
  const howToTags = get(props, 'data.howToTags.group')
  const tagsUrl = `${siteMeta.siteUrl}/${siteMeta.tagsDirectory}/`;

  return (
    <Layout location={props.location}>
      <Helmet
        title={siteMeta.title}
        description={siteMeta.description}
        htmlAttributes={{ lang: 'en' }}
      >
        <link rel="canonical" href={tagsUrl}></link>
      </Helmet>
      <TagsLayout title="Blog Tags" tags={blogTags} tagsUrl={siteMeta.tagsDirectory}/>
      <TagsLayout title="How to Tags" tags={howToTags} tagsUrl={siteMeta.tagsDirectory} />
    </Layout>
  )
}


export default Tags
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
    howToTags: allContentfulHowToPost(filter: {node_locale: {eq: "en-US"}}) {
      group(field: tags) {
        totalCount
        fieldValue
      }
    }
    blogTags: allContentfulBlogPost(filter: {node_locale: {eq: "en-US"}}) {
      group(field: tags) {
        totalCount
        fieldValue
      }
    }
  }
`