import React from 'react';
import * as styles from './index.module.css';

export function Head() {
  return <meta name="robots" content="noindex, nofollow" />;
}

export default function IndexPage() {
  return (
    <div className={styles.maintenance}>
      <p className={styles.status}>// status: offline</p>
      <h1 className={styles.title}>We'll be back soon.</h1>
      <p className={styles.note}>The blog is being redone. Again.</p>
    </div>
  );
}
