const Promise = require('bluebird')
const path = require('path');
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
              allContentfulBlogPostGlobal {
                edges {
                  node {
                    id
                    localized {
                      title
                      slug
                      node_locale
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
  
          const posts = result.data.allContentfulBlogPostGlobal.edges
          posts.forEach((post, index) => {
            const node = post.node.localized;
            if (node) {
              createPage({
                path: `/blog/${node.slug}/`,
                component: blogPost,
                context: {
                  lang: node.node_locale,
                  slug: node.slug
                },
              })
            }
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

const util = require("util");
const child_process = require("child_process");
const exec = util.promisify(child_process.exec);

exports.onPreBuild = async (gatsbyNodeHelpers) => {
  const { reporter } = gatsbyNodeHelpers;

  const reportOut = (report) => {
    const { stderr, stdout } = report;
    if (stderr) reporter.error(stderr);
    if (stdout) reporter.info(stdout);
  };

  reportOut(await exec("npx ls && yarn netlify-build"));
};