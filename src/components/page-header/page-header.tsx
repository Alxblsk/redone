import React, { memo } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { PageHeaderProps } from '../../types';
import logo from '../../../static/photo.png';
import styles from './page-header.module.css';

const BLOG_URL = '/blog/';
const HOWTO_URL = '/how-to/';

const logoTitle = 'Alxblsk.com Logo';
const linksMap = {
  [BLOG_URL]: 'Blog',
  [HOWTO_URL]: 'How to',
} as const;

const PageNav: React.FC<{ pathname: string }> = memo(({ pathname }) => {
  return (
    <nav className={styles.nav}>
      {Object.entries(linksMap).map(([linkUrl, linkText]) => (
        <Link
          key={linkUrl}
          to={linkUrl}
          className={classNames(styles.navItem, {
            [styles.active]: pathname === linkUrl,
          })}
        >
          {linkText}
        </Link>
      ))}
    </nav>
  );
});

PageNav.displayName = 'PageNav';

const PageHeader: React.FC<PageHeaderProps> = ({ location }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogoWrapper}>
        <Link to="/" className={styles.headerLink}>
          <img
            className={styles.headerLogo}
            src={logo}
            alt={logoTitle}
            title={logoTitle}
          />
        </Link>
      </div>
      <div className={styles.headerTitleWrapper}>
        <Link to="/" className={styles.headerLink}>
          <h1 className={styles.headerTitle}>Aliaksei Belski</h1>
          <p className={styles.headerDescription}>
            Front-end developer from Los Angeles
          </p>
        </Link>
      </div>
      <PageNav pathname={location.pathname} />
    </header>
  );
};

export default PageHeader; 