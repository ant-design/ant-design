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

const useParagraphStyles = createStyles(({ css }) => ({
  paragraph: css`
    & > li {
      background-color: rgba(229, 243, 254, 0.5);
    }
  `,
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
        border: '1px solid rgba(229, 243, 254, 0.3)',
      },
      title: {
        backgroundColor: 'rgba(229, 243, 254, 0.5)',
        height: 20,
        borderRadius: 20,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classnames } = useStyles();
  const { styles: paragraphStyles } = useParagraphStyles();
  return (
    <Flex gap="middle">
      <Skeleton classNames={classnames} styles={styles} />
      <Skeleton
        classNames={{
          ...classnames,
          paragraph: paragraphStyles.paragraph,
        }}
        styles={stylesFn}
        active
      />
    </Flex>
  );
};

export default App;
