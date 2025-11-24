import React from 'react';
import { Button, Empty, Flex } from 'antd';
import { createStyles } from 'antd-style';

import type { EmptyProps } from '..';

const emptySharedProps: EmptyProps = {
  image: Empty.PRESENTED_IMAGE_SIMPLE,
  children: <Button type="primary">Create Now</Button>,
};

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 1px dashed #ccc;
    padding: 16px;
  `,
}));

const stylesObject: EmptyProps['styles'] = {
  root: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
  image: { filter: 'grayscale(100%)' },
  description: { color: '#1890ff', fontWeight: 'bold' },
  footer: { marginTop: '16px' },
};

const stylesFn: EmptyProps['styles'] = ({ props }) => {
  if (props.description) {
    return {
      root: { backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' },
      description: { color: '#1890ff', fontWeight: 'bold' },
      image: { filter: 'hue-rotate(180deg)' },
    } satisfies EmptyProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const classNames: EmptyProps['classNames'] = {
    root: styles.root,
  };

  return (
    <Flex vertical gap="middle">
      <Empty
        {...emptySharedProps}
        description="Object styles"
        classNames={classNames}
        styles={stylesObject}
      />
      <Empty
        {...emptySharedProps}
        description="Function styles"
        classNames={classNames}
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
