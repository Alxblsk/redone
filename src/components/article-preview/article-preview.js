import React from 'react'

import ArticleHeader from '../article-header'
import styles from './article-preview.module.css'

export const ArticlePreview = ({ article, directory }) => (
  <div className={styles.preview}>
    <ArticleHeader article={article} directory={directory} />
    <div
      className={styles.articlePreview}
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
