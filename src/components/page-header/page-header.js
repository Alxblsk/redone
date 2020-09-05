import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames';
import logo from '../../../static/photo.png'
import styles from './page-header.module.css'

const BLOG_URL = '/blog/';
const HOWTO_URL = '/how-to/';


const logoTitle = 'Alxblsk.com Logo';
const linksMap = {
  [BLOG_URL]: 'Blog',
  [HOWTO_URL]: 'How to'
}

const PageNav = ({ pathname }) => {
  return (
    <nav className={styles.nav}>
      {
        Object.keys(linksMap).map(linkUrl => (
          <Link
            key={linkUrl}
            to={linkUrl}
            className={classNames(styles.navItem, pathname.startsWith(linkUrl) && styles.active)}
          >
            {linksMap[linkUrl]}
          </Link>
        ))
      }
    </nav>
  )
}

export const PageHeader = ({ location }) => {
  const { pathname } = location;

  return (
    <div className={styles.header}>
      <div className={styles.headerLogoWrapper}>
        <img
          src={logo}
          className={styles.headerLogo}
          alt={logoTitle}
          title={logoTitle}
        />
        <div className={styles.headerTitleWrapper}>
          <Link to="/" className={styles.headerLink}>
            <span className={styles.headerTitle}>RE•DONE</span>
          </Link>
          <div className={styles.headerDescription}>
            Blog by Aliaksei Belski
          </div>
        </div>
      </div>
      <PageNav pathname={pathname} />
    </div>
  )

}