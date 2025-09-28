import React from 'react';
import { Flex, Skeleton } from 'antd';
import type { SkeletonProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    borderRadius: 10,
    padding: 12,
  },
  header: {
    marginBottom: 12,
  },
}));

const styles: SkeletonProps['styles'] = {
  title: {
    height: 20,
    borderRadius: 6,
  },
};

const stylesFn: SkeletonProps['styles'] = (info) => {
  if (info.props.active) {
    return {
      root: {
        border: '1px solid rgba(0,0,0,0.06)',
      },
      title: {
        height: 20,
        borderRadius: 20,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classnames } = useStyles();
  return (
    <Flex gap="middle">
      <Skeleton classNames={classnames} styles={styles} />
      <Skeleton classNames={classnames} styles={stylesFn} active />
    </Flex>
  );
};

export default App;
