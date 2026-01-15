import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { createStaticStyles } from 'antd-style';

const IconSearch = React.lazy(() => import('./IconSearch'));

const styles = createStaticStyles(({ css, cssVar }) => ({
  searchWrapper: css`
    display: flex;
    gap: ${cssVar.padding};
    > *:first-child {
      flex: 0 0 328px;
    }
    > *:last-child {
      flex: 1;
    }
  `,
  fallbackWrapper: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > * {
      flex: 0 0 15%;
      margin: ${cssVar.marginXXS} 0;
    }
  `,
  skeletonWrapper: css`
    text-align: center;

    > * {
      width: 100% !important;
    }
  `,
}));

const IconSearchFallback: React.FC = () => {
  return (
    <>
      <div className={styles.searchWrapper}>
        <Skeleton.Button active style={{ width: '100%', height: 40 }} />
        <Skeleton.Input active style={{ width: '100%', height: 40 }} />
      </div>
      <Skeleton.Button active style={{ margin: '28px 0 10px', width: 100 }} />
      <div className={styles.fallbackWrapper}>
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className={styles.skeletonWrapper}>
            <Skeleton.Node active style={{ height: 110, width: '100%' }}>
              {' '}
            </Skeleton.Node>
          </div>
        ))}
      </div>
    </>
  );
};

export default () => (
  <Suspense fallback={<IconSearchFallback />}>
    <IconSearch />
  </Suspense>
);
