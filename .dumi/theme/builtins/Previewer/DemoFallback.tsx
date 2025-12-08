import React from 'react';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, cssVar }) => ({
  skeletonWrapper: css`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${cssVar.margin};
    border-radius: ${cssVar.borderRadiusLG};
  `,
}));

const DemoFallback = () => {
  const { styles } = useStyle();
  return (
    <Skeleton.Node
      active
      className={styles.skeletonWrapper}
      style={{ width: '100%', height: '100%' }}
    >
      {' '}
    </Skeleton.Node>
  );
};

export default DemoFallback;
