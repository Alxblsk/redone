import React from 'react'
import { Link } from 'gatsby'
import logo from '../../../static/photo.png'
import styles from './page-header.module.css'

const logoTitle = 'Alxblsk.com Logo'

export const PageHeader = () => (
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
    <nav className={styles.nav}>
      <Link to="/blog/" className={styles.navItem}>Blog</Link>
      <Link to="/how-to/" className={styles.navItem}>How to</Link>
    </nav>
  </div>
)
