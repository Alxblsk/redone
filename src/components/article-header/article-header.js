import React from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { articleHeader, meta, dates, date, highlightDate, tags, tag, heroImage as heroImageClass, title, titleLink, howto, draft } from './article-header.module.css'
import { kebabCase } from 'lodash'

export const ArticleHeader = ({ article, isDetails, directory }) => {
  const isNeverPublished = !get(article, 'sys.revision', 0)
  const isUpdated = article.updatedAt && article.publishDate !== article.updatedAt
  const heroImage = get(article, 'heroImage.fluid', null)
  const howToSection = directory === 'how-to';

  return (
    <div
      className={classNames(
        articleHeader,
        isNeverPublished && draft
      )}
    >
      <h2 className={`h1 ${title} ${howToSection ? howto : ''}`}>
        {isDetails ? (
          article.title
        ) : (
          <Link to={`/${directory}/${article.slug}/`} className={titleLink}>
            {article.title}
          </Link>
        )}
      </h2>
      <p className={meta}>
        <span className={dates}>
          <span className={date}>
            Published:{' '}
            <span className={highlightDate}>{article.publishDate}</span>
          </span>
          {isUpdated && isDetails ? (
            <span className={date}>
              ,&nbsp;Updated:{' '}
              <span className={highlightDate}>{article.updatedAt}</span>
            </span>
          ) : null}
        </span>
        <span className={tags}>
          {(article.tags || []).map((t) => (
            <Link className={tag} key={t} to={`/tags/${kebabCase(t)}/`}>
              {t}
            </Link>
          ))}
        </span>
      </p>
      {heroImage && howToSection && (
        <div className={heroImageClass}>
          <Img alt={article.title} title={article.title} fluid={heroImage} />
        </div>
      )}
    </div>
  )
}
