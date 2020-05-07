import React from 'react'

import ArticleHeader from '../article-header'
import styles from './article-preview.module.css'

export const ArticlePreview = ({ article }) => (
  <div className={styles.preview}>
    <ArticleHeader article={article} />
    <div
      className={styles.articlePreview}
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
