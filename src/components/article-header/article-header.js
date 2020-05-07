import React from 'react'
import { Link } from 'gatsby'

import styles from './article-header.module.css'

export const ArticleHeader = ({ article }) => (
  <div className={styles.ArticleHeader}>
    <h3 className={styles.title}>
      <Link to={`/blog/${article.slug}`} className={styles.titleLink}>
        {article.title}
      </Link>
    </h3>
    <p className={styles.meta}>
      <span className={styles.date}>{article.publishDate}</span>
      {(article.tags || []).map((tag) => (
        <span className={styles.tag} key={tag}>
          {tag}
        </span>
      ))}
    </p>
  </div>
)
