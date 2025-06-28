import { ReactNode } from 'react';

// Location interface for Gatsby pages
export interface Location {
  pathname: string;
  search: string;
  hash: string;
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
}

// Layout component props
export interface LayoutProps {
  children: ReactNode;
  location: Location;
}

// Page header props
export interface PageHeaderProps {
  location: Location;
}

// Vote component props
export interface VoteProps {
  id: string;
  url: string;
}

// Vote data interface
export interface VoteData {
  id: string;
  likes: number;
  dislikes: number;
  userVote?: 'like' | 'dislike' | null;
}

// Article interfaces
export interface ArticleHeaderProps {
  article: {
    title: string;
    description?: {
      description: string;
    };
    publishDate: string;
    slug: string;
    heroImage?: {
      gatsbyImageData: any;
    };
  };
  directory: string;
  isDetails?: boolean;
}

export interface ArticlePreviewProps {
  article: {
    title: string;
    description?: {
      description: string;
    };
    publishDate: string;
    slug: string;
    heroImage?: {
      gatsbyImageData: any;
    };
  };
  directory: string;
}

// Blog post template props
export interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        blogDirectory: string;
        firstName: string;
        lastName: string;
      };
    };
    contentfulBlogPost: {
      title: string;
      description?: {
        description: string;
      };
      publishDate: string;
      publishDateUtc: string;
      updatedAt: string;
      updatedAtUts: string;
      nodeLocale: string;
      tags?: string[];
      slug: string;
      heroImage?: {
        gatsbyImageData: any;
      };
      body: {
        childMarkdownRemark: {
          html: string;
        };
      };
    };
  };
  pageContext: {
    lang?: string;
  };
  location: Location;
}

// How-to post template props
export interface HowToPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        howToDirectory: string;
        firstName: string;
        lastName: string;
      };
    };
    contentfulHowToPost: {
      title: string;
      description?: {
        description: string;
      };
      publishDate: string;
      slug: string;
      heroImage?: {
        gatsbyImageData: any;
      };
      body: {
        childMarkdownRemark: {
          html: string;
        };
      };
      nodeLocale: string;
    };
  };
  pageContext: {
    lang?: string;
  };
  location: Location;
}

// Page props for index pages
export interface PageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        blogDirectory: string;
        howToDirectory: string;
        firstName: string;
        lastName: string;
      };
    };
    allContentfulBlogPost?: {
      edges: Array<{
        node: {
          title: string;
          description?: {
            description: string;
          };
          publishDate: string;
          slug: string;
          heroImage?: {
            gatsbyImageData: any;
          };
        };
      }>;
    };
    allContentfulBlogPostGlobal?: {
      group: Array<{
        fieldValue: string;
        edges: Array<{
          node: {
            title: string;
            description?: {
              description: string;
            };
            publishDate: string;
            slug: string;
            heroImage?: {
              gatsbyImageData: any;
            };
          };
        }>;
      }>;
    };
    allContentfulHowToPost?: {
      edges: Array<{
        node: {
          title: string;
          description?: {
            description: string;
          };
          publishDate: string;
          slug: string;
          heroImage?: {
            gatsbyImageData: any;
          };
        };
      }>;
    };
  };
  location: Location;
}

// Social pane props
export interface SocialPaneProps {}

// Container props
export interface ContainerProps {
  children: ReactNode;
}

// Not found props
export interface NotFoundProps {}

// Site data interface
export interface SiteData {
  siteMetadata: {
    title: string;
    description: string;
    siteUrl: string;
    blogDirectory: string;
    howToDirectory: string;
    tagsDirectory: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

// How-to post data interface
export interface HowToPostData {
  title: string;
  slug: string;
  tags?: string[];
  contentful_id: string;
  sys: {
    revision: number;
  };
  description?: {
    description: string;
  };
  publishDate: string;
  updatedAt: string;
  publishDateUtc: string;
  updatedAtUts: string;
  nodeLocale: string;
  heroImage?: {
    gatsbyImageData: any;
  };
  body: {
    childMarkdownRemark: {
      html: string;
    };
  };
}

// Blog post data interface
export interface BlogPostData {
  title: string;
  slug: string;
  tags?: string[];
  contentful_id: string;
  sys: {
    revision: number;
  };
  description?: {
    description: string;
  };
  publishDate: string;
  updatedAt: string;
  publishDateUtc: string;
  updatedAtUts: string;
  nodeLocale: string;
  heroImage?: {
    gatsbyImageData: any;
  };
  body: {
    childMarkdownRemark: {
      html: string;
    };
  };
} 