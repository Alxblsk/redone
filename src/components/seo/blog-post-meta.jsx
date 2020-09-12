import React from 'react';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

export const BlogPostMeta = function ({ post, meta, lang, directory }) {
  const heroImage = get(post, 'heroImage.fluid', null);
  const postDescription = get(post, 'description.description', null);
  const postUrl = `${meta.siteUrl}/${directory}/${post.slug}/`;

  return (
    <Helmet
      title={`${post.title} | ${meta.title}`}
      htmlAttributes={{ lang, prefix: 'og: http://ogp.me/ns#' }}
    >
      <meta name="description" content={postDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={`@${meta.username}`} />
      {heroImage && <meta name="twitter:image" content={heroImage.src} />}

      <meta property="og:title" content={`${post.title}`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      {heroImage && <meta property="og:image" content={heroImage.src} />}
      <meta property="og:description" content={postDescription} />
      <meta property="profile:first_name" content={meta.firstName} />
      <meta property="profile:last_name" content={meta.lastName} />
      <meta property="profile:username" content={meta.username} />

      <link rel="canonical" href={postUrl}></link>
      <link rel="preconnect" href="https://cdn.commento.io"></link>

      <link
        rel="alternate"
        type="application/rss+xml"
        title={meta.title}
        href="/rss.xml"
      />
    </Helmet>
  );
};
