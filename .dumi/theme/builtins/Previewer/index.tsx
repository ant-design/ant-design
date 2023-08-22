import React, { Suspense } from 'react';
import type { IPreviewerProps } from 'dumi';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const Previewer = React.lazy(() => import('./Previewer'));

const useStyle = createStyles(({ css }) => ({
  skeletonWrapper: css`
    width: 100% !important;
    height: 500px;
    margin-bottom: 16px;
  `,
}));

export default (props: IPreviewerProps) => {
  const { styles } = useStyle();
  return (
    <Suspense
      fallback={
        <Skeleton.Node
          active
          className={styles.skeletonWrapper}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {' '}
        </Skeleton.Node>
      }
    >
      <Previewer {...props} />
    </Suspense>
  );
};
