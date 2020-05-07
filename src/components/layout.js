import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'

import PageHeader from './page-header'
import SocialPane from './social-pane'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <div className="wrapper">
        <PageHeader />
        {children}
        <SocialPane />
      </div>
    )
  }
}

export default Template
