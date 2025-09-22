import React from 'react';
import { Flex, Input, Space } from 'antd';
import type { InputProps } from 'antd';

const classNamesObject: InputProps['classNames'] = {
  root: 'demo-input-root',
  input: 'demo-input-element',
};

const classNamesFn: InputProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-input-root--disabled' };
  }
  return { root: 'demo-input-root--enabled' };
};

const stylesObject: InputProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  input: { fontStyle: 'italic' },
};

const stylesFn: InputProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <Input classNames={classNamesObject} placeholder="classNames Object" />
      <Input disabled classNames={classNamesFn} placeholder="classNames Function" />
    </Flex>
    <Flex gap="small">
      <Input styles={stylesObject} placeholder="styles Object" />
      <Input size="large" styles={stylesFn} placeholder="styles Function" />
    </Flex>
  </Space>
);

export default App;
