import React from 'react';

import ArticleHeader from '../article-header';
import { articlePreview } from './article-preview.module.css';

export const ArticlePreview = ({ article, directory }) => (
  <div>
    <ArticleHeader article={article} directory={directory} />
    <div
      className={articlePreview}
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
);
