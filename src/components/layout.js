import React from 'react';

import PageHeader from './page-header';
import SocialPane from './social-pane';

import './base.css';

class Template extends React.Component {
  render() {
    const { children, location } = this.props;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    return (
      <div className="wrapper">
        <PageHeader location={location} />
        <div className="layout-content">{children}</div>
        <SocialPane />
      </div>
    );
  }
}

export default Template;
