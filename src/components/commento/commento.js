import { Helmet } from 'react-helmet'
import React, { Fragment } from 'react'

// Of course ejecting unnecessary script usually is a good idea
// But in this case resource is cached anyways, so it's not an issue
export const Commento = () => {
  return (
    <Fragment>
      <div id="commento" />
      <Helmet>
        <script defer src="https://cdn.commento.io/js/commento.js" />
      </Helmet>
    </Fragment>
  )
}
