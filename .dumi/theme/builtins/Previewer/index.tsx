import React, { Suspense } from 'react';
import type { IPreviewerProps } from 'dumi';

const Previewer = React.lazy(() => import('./Previewer'));

export default (props: IPreviewerProps) => (
  <Suspense fallback={null}>
    <Previewer {...props} />
  </Suspense>
);
