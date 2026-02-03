import React from 'react';
import { Flex, Skeleton } from 'antd';
import type { SkeletonProps, SkeletonSemanticType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classnames = createStaticStyles(({ css }) => ({
  root: css`
    border-radius: 10px;
    padding: 12px;
  `,
  header: css`
    margin-bottom: 12px;
  `,
}));

const paragraphStyles = createStaticStyles(({ css }) => ({
  paragraph: css`
    & > li {
      background-color: rgba(229, 243, 254, 0.5);
    }
  `,
}));

const styles: SkeletonProps['styles'] = {
  avatar: {
    border: '1px solid #aaa',
  },
  title: {
    border: '1px solid #aaa',
  },
};

const stylesFn: SkeletonProps['styles'] = (info): SkeletonSemanticType['styles'] => {
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
  return (
    <Flex gap="middle">
      <Skeleton classNames={classnames} styles={styles} avatar paragraph={false} />
      <Skeleton
        classNames={{ ...classnames, paragraph: paragraphStyles.paragraph }}
        styles={stylesFn}
        active
      />
    </Flex>
  );
};

export default App;
