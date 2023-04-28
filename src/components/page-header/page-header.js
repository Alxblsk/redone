import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import logo from '../../../static/photo.png';
import { nav, navItem, active, header, headerLogoWrapper, headerLogo, headerTitleWrapper, headerLink, headerTitle, headerDescription } from './page-header.module.css';

const BLOG_URL = '/blog/';
const HOWTO_URL = '/how-to/';

const logoTitle = 'Alxblsk.com Logo';
const linksMap = {
  [BLOG_URL]: 'Blog',
  [HOWTO_URL]: 'How to',
};

const PageNav = ({ pathname }) => {
  return (
    <nav className={nav}>
      {Object.keys(linksMap).map((linkUrl) => (
        <Link
          key={linkUrl}
          to={linkUrl}
          className={classNames(
            navItem,
            pathname.startsWith(linkUrl) && active
          )}
        >
          {linksMap[linkUrl]}
        </Link>
      ))}
    </nav>
  );
};

export const PageHeader = ({ location }) => {
  const { pathname } = location;

  return (
    <div className={header}>
      <div className={headerLogoWrapper}>
        <Link to="/">
          <img
            src={logo}
            className={headerLogo}
            alt={logoTitle}
            title={logoTitle}
          />
        </Link>
        <div className={headerTitleWrapper}>
          <Link to="/" className={headerLink}>
            <span className={headerTitle}>RE•DONE</span>
          </Link>
          <div className={headerDescription}>
            Blog by Aliaksei Belski
          </div>
        </div>
      </div>
      <PageNav pathname={pathname} />
    </div>
  );
};
