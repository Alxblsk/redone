import React from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-header.module.css'
import { kebabCase } from 'lodash'

export const ArticleHeader = ({ article, isDetails, directory }) => {
  const isNeverPublished = !get(article, 'sys.revision', 0)
  const isUpdated = article.updatedAt && article.publishDate !== article.updatedAt
  const heroImage = get(article, 'heroImage.fluid', null)
  const howToSection = directory === 'how-to';

  return (
    <div
      className={classNames(
        styles.articleHeader,
        isNeverPublished && styles.draft
      )}
    >
      <h2 className={`h1 ${styles.title} ${howToSection ? styles.howto : ''}`}>
        {isDetails ? (
          article.title
        ) : (
          <Link to={`/${directory}/${article.slug}/`} className={styles.titleLink}>
            {article.title}
          </Link>
        )}
      </h2>
      <p className={styles.meta}>
        <span className={styles.dates}>
          <span className={styles.date}>
            Published:{' '}
            <span className={styles.highlightDate}>{article.publishDate}</span>
          </span>
          {isUpdated && isDetails ? (
            <span className={styles.date}>
              ,&nbsp;Updated:{' '}
              <span className={styles.highlightDate}>{article.updatedAt}</span>
            </span>
          ) : null}
        </span>
        <span className={styles.tags}>
          {(article.tags || []).map((tag) => (
            <Link className={styles.tag} key={tag} to={`/tags/${kebabCase(tag)}/`}>
              {tag}
            </Link>
          ))}
        </span>
      </p>
      {heroImage && howToSection && (
        <div className={styles.heroImage}>
          <Img alt={article.title} title={article.title} fluid={heroImage} />
        </div>
      )}
    </div>
  )
}
