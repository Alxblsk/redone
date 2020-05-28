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
    description: 'Personal blog of Aliaksei Belski, a front-end developer from Minsk, Belarus',
    siteUrl: 'https://alxblsk.com',
    blogDirectory: 'blog',
    username: 'alxblsk',
    firstName: 'Aliaksei',
    lastName: 'Belski'
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
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
                blogDirectory
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return  allContentfulBlogPost.nodes.map(node => {
                const url = `${site.siteMetadata.siteUrl}/${site.siteMetadata.blogDirectory}/${node.slug}/`
                return Object.assign({}, {
                  title: node.title,
                  description: node.description.description,
                  date: node.publishDate,
                  url,
                  guid: node.id,
                  custom_elements: [{ "content:encoded": node.body.childMarkdownRemark.html }],
                })
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
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Blog by Aliaksei Belski | RSS Feed",
            match: "^/blog/",
          },
        ],
      },
    },
  ],
}
