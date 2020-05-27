import React from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { Link } from 'gatsby'

import styles from './article-header.module.css'

export const ArticleHeader = ({ article, isDetails }) => {
  const isNeverPublished = !get(article, 'sys.revision', 0);
  const isUpdated = article.updatedAt && article.publishDate !== article.updatedAt;

  return (
    <div className={classNames(styles.articleHeader, isNeverPublished && styles.draft)}>
      <h1 className={styles.title}>
        {isDetails ? (
          article.title
        ) : (
            <Link to={`/blog/${article.slug}`} className={styles.titleLink}>
              {article.title}
            </Link>
          )}
      </h1>
      <p className={styles.meta}>
        <span className={styles.date}>Published: <span className={styles.highlightDate}>{article.publishDate}</span></span>
        {
          isUpdated && isDetails
            ? <span className={styles.date}>,&nbsp;Updated:  <span className={styles.highlightDate}>{article.updatedAt}</span></span>
            : null
        }
        {(article.tags || []).map((tag) => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))}
      </p>
    </div>
  )
}
