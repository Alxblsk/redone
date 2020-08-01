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
  siteMetadata: {
    title: 'Blog by Aliaksei Belski',
    description: 'Personal blog written by Aliaksei Belski, a front-end developer from Minsk, Belarus',
    siteUrl: 'https://alxblsk.com',
    blogDirectory: 'blog',
    howToDirectory: 'how-to',
    username: 'alxblsk',
    firstName: 'Aliaksei',
    lastName: 'Belski'
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/blog/test-blog-post/']
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

                if (node.heroImage) {
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
            image_url: 'https://alxblsk.com/rss.jpg'
          },
        ],
      },
    },
  ],
}
