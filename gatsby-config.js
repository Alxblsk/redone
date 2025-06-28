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
        },
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.removeHeader('origin');
          proxyReq.removeHeader('referer');
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Proxy error: ' + err.message);
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
    'gatsby-plugin-netlify',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-N09W5H37GM"],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "G-N09W5H37GM",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
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

                // if (node.heroImage && node.heroImage.fixed) {
                //   enclosure = {
                //     url: node.heroImage.fixed.src,
                //     type: node.heroImage.file.contentType
                //   }
                // }

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
