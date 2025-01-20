import React, { Suspense } from 'react';
import { Alert } from 'antd';
import Previewer from './Previewer';
import DemoFallback from './DemoFallback';
import type { IPreviewerProps } from 'dumi';

const { ErrorBoundary } = Alert;

const PreviewerSuspense: React.FC<IPreviewerProps> = (props) => (
  <ErrorBoundary>
    <Suspense fallback={<DemoFallback />}>
      <Previewer {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PreviewerSuspense;
