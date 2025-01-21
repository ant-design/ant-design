import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const IconSearch = React.lazy(() => import('./IconSearch'));

const useStyle = createStyles(({ token, css }) => ({
  searchWrapper: css`
    display: flex;
    gap: ${token.padding}px;
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
      margin: ${token.marginXXS}px 0;
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
  const { styles } = useStyle();

  return (
    <>
      <div className={styles.searchWrapper}>
        <Skeleton.Button active style={{ width: '100%', height: 40 }} />
        <Skeleton.Input active style={{ width: '100%', height: 40 }} />
      </div>
      <Skeleton.Button active style={{ margin: '28px 0 10px', width: 100 }} />
      <div className={styles.fallbackWrapper}>
        {new Array(24).fill(1).map((_, index) => (
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
