import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import NotFound from '../components/not-found'


class NotFoundPage extends React.Component {
  render() {
    const siteTitle = `404 | ${get(this, 'props.data.site.siteMetadata.title')}`

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} htmlAttributes={{"lang": "en"}} />
        <NotFound />
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
