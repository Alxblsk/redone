const BLOG_POST_TYPE = 'ContentfulBlogPost';
const HOW_TO_POST_TYPE = 'ContentfulHowToPost';

export const getPageDirectory = (metadata) => (contentfulPageType) => {
  switch (contentfulPageType) {
    case BLOG_POST_TYPE:
      return metadata.blogDirectory;
    case HOW_TO_POST_TYPE:
      return metadata.howToDirectory;
    default:
      return '';
  }
};
