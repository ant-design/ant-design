import React from 'react';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token, css }) => ({
  skeletonWrapper: css`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${token.margin}px;
    border-radius: ${token.borderRadiusLG}px;
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
