import React from 'react';
import get from 'lodash/get'
import { BlogPosting } from "schema-dts";
import { JsonLd } from "react-schemaorg";

export function BlogPostSchema({ post, meta }) {
    const heroImageSrc = get(post, 'heroImage.fluid.src')
    const description = get(post, 'description.description')

    const jsonld = <JsonLd<BlogPosting>
        item={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            abstract: description,
            image: heroImageSrc,
            datePublished: post.publishDateUtc,
            dateModified: post.updatedAtUtc,
            author: {
                "@type": "Person",
                name: `${meta.firstName} ${meta.lastName}`,
                url: meta.siteUrl
            },
            publisher: {
                "@type": "Person",
                name: `${meta.firstName} ${meta.lastName}`,
                url: meta.siteUrl
            },
            keywords: post.tags,
            inLanguage: post.nodeLocale,
            isFamilyFriendly: true
        }} />;

    return jsonld;
}