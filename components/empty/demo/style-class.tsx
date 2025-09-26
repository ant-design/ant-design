import React from 'react';
import { Button, Empty, Flex } from 'antd';
import type { EmptyProps } from '..';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 1px dashed #ccc;
    padding: 16px;
  `,
}));

// Object-based styles
const stylesObject = {
  root: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
  image: { filter: 'grayscale(100%)' },
  description: { color: '#1890ff', fontWeight: 'bold' },
  footer: { marginTop: '16px' },
};

// Function-based styles - differentiate by props
const stylesFn: EmptyProps['styles'] = ({ props: { description } }) => {
  if (description) {
    return {
      root: { backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' },
      description: { color: '#1890ff', fontWeight: 'bold' },
      image: { filter: 'hue-rotate(180deg)' },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const emptySharedProps: EmptyProps = {
    image: Empty.PRESENTED_IMAGE_SIMPLE,
    children: <Button type="primary">Create Now</Button>,
  };

  // Use same classNames across examples
  const sharedClassNames = { root: styles.root };

  return (
    <Flex vertical gap="middle">
      <Empty
        {...emptySharedProps}
        description="Object styles"
        classNames={sharedClassNames}
        styles={stylesObject}
      />
      <Empty
        {...emptySharedProps}
        description="Function styles"
        classNames={sharedClassNames}
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
