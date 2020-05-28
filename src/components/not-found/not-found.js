import React from 'react'

import styles from './not-found.module.css'

export const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.p404}>404</div>
      <h4 className={styles.subtitle}>
        Sorry, the page you're looking for is not available
      </h4>
    </div>
  )
}
