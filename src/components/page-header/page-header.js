import React from 'react'
import { Link } from 'gatsby'
import logo from '../../../static/photo.png'
import styles from './page-header.module.css'

export const PageHeader = () => (
  <div className={styles.rdHeader}>
    <img src={logo} className={styles.rdHeaderLogo} />
    <div className={styles.rdHeaderTitleWrapper}>
      <Link to="/" className={styles.rdHeaderLink}>
        <span className={styles.rdHeaderTitle}>RE•DONE</span>
      </Link>
      <span className={styles.rdHeaderDescription}>
        Blog by Aliaksei Belski
      </span>
    </div>
  </div>
)
