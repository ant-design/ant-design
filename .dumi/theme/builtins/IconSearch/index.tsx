import React, { Suspense } from 'react';

const IconSearch = React.lazy(() => import('./IconSearch'));

export default () => (
  <Suspense fallback="loading">
    <IconSearch />
  </Suspense>
);
