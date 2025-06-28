import React from 'react';

import { notFoundWrapper, p404, subtitle } from './not-found.module.css';

export const NotFound = () => {
  return (
    <div className={notFoundWrapper}>
      <div className={p404}>404</div>
      <h4 className={subtitle}>
        Sorry, the page you're looking for is not available
      </h4>
    </div>
  );
};
