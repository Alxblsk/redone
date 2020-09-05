const Promise = require('bluebird')
const path = require('path')
const kebabCase = require('lodash').kebabCase;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return Promise.all([
    // BLOG pages
    new Promise((resolve, reject) => {
      const blogPost = path.resolve('./src/templates/blog-post.js')
      resolve(
        graphql(
          `
            {
              allContentfulBlogPost {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
            `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
  
          const posts = result.data.allContentfulBlogPost.edges
          posts.forEach((post, index) => {
            createPage({
              path: `/blog/${post.node.slug}/`,
              component: blogPost,
              context: {
                slug: post.node.slug
              },
            })
          })
        })
      )
    }),
    // HOW TO pages
    new Promise((resolve, reject) => {
      const howToPost = path.resolve('./src/templates/how-to-post.js')
      resolve(
        graphql(
          `
            {
              allContentfulHowToPost {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
            `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
  
          const posts = result.data.allContentfulHowToPost.edges
          posts.forEach((post, index) => {
            createPage({
              path: `/how-to/${post.node.slug}/`,
              component: howToPost,
              context: {
                slug: post.node.slug
              },
            })
          })
        })
      )
    }),
    // TAG page
    new Promise((resolve, reject) => {
      const tagPage = path.resolve('./src/templates/tag-page.js')
      resolve(
        graphql(
          `
            {
              howToTags: allContentfulHowToPost {
                group(field: tags) {
                    field
                    fieldValue
                    nodes {
                    title
                    slug
                    internal {
                        type
                      }
                    }
                  }
                }
                blogTags: allContentfulBlogPost {
                  group(field: tags) {
                    field
                    fieldValue
                    nodes {
                    title
                    slug
                    internal {
                        type
                      }
                    }
                  }
                }
            }
            `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
  
          const blogTags = result.data.blogTags.group;
          const howToTags = result.data.howToTags.group;
          const tags = [...blogTags, ...howToTags];

          tags.forEach((tag, index) => {
            createPage({
              path: `/tags/${kebabCase(tag.fieldValue)}/`,
              component: tagPage,
              context: {
                tag: tag.fieldValue,
                slug: kebabCase(tag.fieldValue)
              },
            })
          })
        })
      )
    })
  ])
}
