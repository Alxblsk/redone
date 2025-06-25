import React from 'react';
import get from 'lodash/get'
import { BlogPosting } from "schema-dts";
import { JsonLd } from "react-schemaorg";

export function BlogPostSchema({ post, siteMeta, postUrl }) {
    const heroImage = get(post, 'heroImage.gatsbyImageData', null);
    const description = get(post, 'description.description');

    const jsonld = <JsonLd<BlogPosting>
        item={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            abstract: description,
            image: heroImage ? {
                "@type": "ImageObject",
                url: `${heroImage.images.fallback.src}`,
                width: heroImage.width,
                height: heroImage.height
            } : undefined,
            datePublished: post.publishDateUtc,
            dateModified: post.updatedAtUts,
            url: postUrl,
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": postUrl
            },
            author: {
                "@type": "Person",
                name: `${siteMeta.firstName} ${siteMeta.lastName}`,
                url: siteMeta.siteUrl,
                sameAs: [
                    `https://github.com/${siteMeta.username}`,
                    `https://www.linkedin.com/in/${siteMeta.username}/`
                ]
            },
            publisher: {
                "@type": "Organization",
                name: siteMeta.title,
                url: siteMeta.siteUrl
            },
            keywords: post.tags,
            inLanguage: post.nodeLocale,
            isFamilyFriendly: true
        }} />;

    return jsonld;
}