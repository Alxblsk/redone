import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import NotFound from '../components/not-found';

const NotFoundPage = props => {
  return (
    <Layout location={props.location}>
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;

export function Head({ data }) {
  const siteTitle = `404 | ${get(data, 'site.siteMetadata.title')}`;

  return (
    <>
      <title>{siteTitle}</title>
      <html lang="en" />
    </>
  );
}

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
