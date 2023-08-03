import React from 'react';
import type { ComponentChangelogProps } from './ComponentChangelog';

const ComponentChangelog = React.lazy(() => import('./ComponentChangelog'));

export default (props: ComponentChangelogProps) => (
  <React.Suspense fallback={null}>
    <ComponentChangelog {...props} />
  </React.Suspense>
);
