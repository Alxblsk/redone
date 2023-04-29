import React from 'react';

import PageHeader from './page-header';
import SocialPane from './social-pane';

import './base.css';

class Template extends React.Component {
  render() {
    const { children, location } = this.props;

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
