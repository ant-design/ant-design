import React from 'react';
import { Button, Flex, Space } from 'antd';
import type { ButtonProps } from 'antd';

const classNamesObject: ButtonProps['classNames'] = {
  root: 'demo-btn-root',
  content: 'demo-btn-content',
  icon: 'demo-btn-icon',
};

const classNamesFn: ButtonProps['classNames'] = (info) => {
  if (info.props.type === 'primary') {
    return { root: 'demo-btn-root--primary' };
  }
  return { root: 'demo-btn-root--default' };
};

const stylesObject: ButtonProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  content: { fontStyle: 'italic' },
  icon: { opacity: 0.85 },
};

const stylesFn: ButtonProps['styles'] = (info) => {
  if (info.props.disabled) {
    return { root: { opacity: 0.5, cursor: 'not-allowed', borderColor: 'red' } };
  }
  return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
};

const App: React.FC = () => {
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Button type="default" classNames={classNamesObject}>
          classNames Object
        </Button>
        <Button type="primary" disabled classNames={classNamesFn}>
          classNames Function
        </Button>
      </Flex>
      <Flex gap="small">
        <Button type="default" styles={stylesObject}>
          styles Object
        </Button>
        <Button type="primary" disabled styles={stylesFn}>
          styles Function
        </Button>
      </Flex>
    </Space>
  );
};

export default App;
