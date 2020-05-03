import React from 'react'
import { Link } from 'gatsby'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`} className={styles.previewTitleLink}>{article.title}</Link>
    </h3>
    <p className={styles.articleMeta}>
      <span className={styles.articleDate}>{article.publishDate}</span>
      {(article.tags || []).map(tag => (
        <span className={styles.tag} key={tag}>{tag}</span>
      ))}
    </p>
    <div className={styles.articlePreview}
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
