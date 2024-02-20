import React, { Suspense } from 'react';
import { Alert, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import type { IPreviewerProps } from 'dumi';

const { ErrorBoundary } = Alert;

const Previewer = React.lazy(() => import('./Previewer'));

const useStyle = createStyles(({ css }) => ({
  skeletonWrapper: css`
    width: 100% !important;
    height: 250px;
    margin-bottom: 16px;
    border-radius: 8px;
  `,
}));

const PreviewerSuspense: React.FC<IPreviewerProps> = (props) => {
  const { styles } = useStyle();
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Skeleton.Node
            active
            className={styles.skeletonWrapper}
            style={{ width: '100%', height: '100%' }}
          >
            {' '}
          </Skeleton.Node>
        }
      >
        <Previewer {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PreviewerSuspense;
