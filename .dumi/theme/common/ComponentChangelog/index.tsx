import React from 'react';

import ComponentChangelog from './ComponentChangelog';

const ChangeLog: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => (
  <React.Suspense fallback={null}>
    <ComponentChangelog>{children}</ComponentChangelog>
  </React.Suspense>
);

export default ChangeLog;
