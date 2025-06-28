import React from 'react';
import { LayoutProps } from '../types';

import PageHeader from './page-header';
import SocialPane from './social-pane';

import './base.css';

const Layout: React.FC<LayoutProps> = ({ children, location }) => {
  return (
    <div className="wrapper">
      <PageHeader location={location} />
      <div className="layout-content">{children}</div>
      <SocialPane />
    </div>
  );
};

export default Layout;
