const { createProxyMiddleware } = require("http-proxy-middleware")

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  developMiddleware: app => {
    app.use(
      "/api/v1",
      createProxyMiddleware({
        target: process.env.REDONE_VOTE_HOST + process.env.REDONE_VOTE_PREFIX,
        headers: {
          'x-api-key': process.env.API_WRITE_KEY
        }
      })
    )
  },
  siteMetadata: {
    title: 'Blog by Aliaksei Belski',
    description: 'Personal blog written by Aliaksei Belski, a front-end developer from Los Angeles',
    siteUrl: 'https://belski.dev',
    blogDirectory: 'blog',
    howToDirectory: 'how-to',
    tagsDirectory: 'tags',
    username: 'alxblsk',
    firstName: 'Aliaksei',
    lastName: 'Belski'
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/blog/test-blog-post/', 
          '/how-to/test-how-to-post/'
        ]
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
      },
    },
    {
      resolve: `gatsby-plugin-minify-classnames`,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                blogDirectory
                firstName
                lastName
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.nodes.map(node => {
                const meta = site.siteMetadata;
                const url = `${meta.siteUrl}/${meta.blogDirectory}/${node.slug}/`;

                const result = {
                  title: node.title,
                  description: node.description.description,
                  date: node.publishDate,
                  url,
                  guid: node.id,
                  custom_elements: [{ "content:encoded": node.body.childMarkdownRemark.html }],
                  author: `${meta.firstName} ${meta.lastName}`
                };

                let enclosure;

                if (node.heroImage && node.heroImage.fixed) {
                  enclosure = {
                    url: node.heroImage.fixed.src,
                    type: node.heroImage.file.contentType
                  }
                }

                return Object.assign({}, result, { enclosure: enclosure })
              })
            },
            query: `
              {
                allContentfulBlogPost {
                  nodes {
                    description {
                      description
                    }
                    body {
                      childMarkdownRemark {
                        html
                      }
                    }
                    slug
                    id
                    title
                    publishDate
                    heroImage {
                      gatsbyImageData
                      fixed {
                        src
                      }
                      file {
                        contentType
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Blog by Aliaksei Belski",
            match: "^/blog/",
            image_url: 'https://belski.page/rss.jpg'
          },
        ],
      },
    },
  ],
}
