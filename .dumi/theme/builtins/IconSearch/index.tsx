import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const IconSearch = React.lazy(() => import('./IconSearch'));

const useStyle = createStyles(({ css }) => ({
  fallbackWrapper: css`
    display: flex;
    flex-wrap: wrap;
    > * {
      flex: 0 0 16.66%;
      margin-bottom: 16px;
    }
  `,
  skeletonWrapper: css`
    text-align: center;

    > * {
      width: 80% !important;
    }
  `,
}));

const IconSearchFallback = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.fallbackWrapper}>
      {Array(30)
        .fill(1)
        .map((_, index) => (
          <div key={index} className={styles.skeletonWrapper}>
            <Skeleton.Node active style={{ height: 110, width: '100%' }}>
              {' '}
            </Skeleton.Node>
          </div>
        ))}
    </div>
  );
};

export default () => (
  <Suspense fallback={<IconSearchFallback />}>
    <IconSearchFallback />
  </Suspense>
);
