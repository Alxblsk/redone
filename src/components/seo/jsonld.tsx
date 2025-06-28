import React from 'react';
import get from 'lodash/get';
import { BlogPosting } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';
import { BlogPostData, SiteData } from '../../types';

interface BlogPostSchemaProps {
  post: Partial<BlogPostData>;
  siteMeta: Partial<SiteData['siteMetadata']>;
  postUrl: string;
}

export function BlogPostSchema({
  post,
  siteMeta,
  postUrl,
}: BlogPostSchemaProps) {
  const heroImage = get(post, 'heroImage.gatsbyImageData', null);
  const description = get(post, 'description.description');

  if (!post || !siteMeta) {
    return null;
  }

  const jsonld = (
    <JsonLd<BlogPosting>
      item={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        abstract: description,
        image: heroImage
          ? {
              '@type': 'ImageObject',
              url: `${heroImage.images.fallback.src}`,
              width: heroImage.width,
              height: heroImage.height,
            }
          : undefined,
        datePublished: post.publishDateUtc || post.publishDate,
        dateModified: post.updatedAtUts || post.updatedAt,
        url: postUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        author: {
          '@type': 'Person',
          name: `${siteMeta.firstName || ''} ${siteMeta.lastName || ''}`.trim(),
          url: siteMeta.siteUrl || '',
          sameAs: [
            `https://x.com/belski_dev`,
            `https://github.com/${siteMeta.username || 'alxblsk'}`,
            `https://www.linkedin.com/in/${siteMeta.username || 'alxblsk'}/`,
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: siteMeta.title || '',
          url: siteMeta.siteUrl || '',
        },
        keywords: post.tags || [],
        inLanguage: post.nodeLocale || 'en-US',
        isFamilyFriendly: true,
      }}
    />
  );

  return jsonld;
}
