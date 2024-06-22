import React from 'react';

import type { ComponentChangelogProps } from './ComponentChangelog';
import ComponentChangelog from './ComponentChangelog';

export default (props: ComponentChangelogProps) => (
  <React.Suspense fallback={null}>
    <ComponentChangelog {...props} />
  </React.Suspense>
);
