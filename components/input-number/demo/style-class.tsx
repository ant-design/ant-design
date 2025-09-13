import React from 'react';
import { Flex, InputNumber, Space } from 'antd';
import type { InputNumberProps } from 'antd';

const classNamesObject: InputNumberProps['classNames'] = {
  root: 'demo-input-number-root',
  input: 'demo-input-number-element',
  prefix: 'demo-input-number-prefix',
  suffix: 'demo-input-number-suffix',
  actions: 'demo-input-number-actions',
};

const classNamesFn: InputNumberProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-input-number-root--disabled' };
  }
  return { root: 'demo-input-number-root--enabled' };
};

const stylesObject: InputNumberProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  input: { fontStyle: 'italic' },
  prefix: { color: '#52c41a' },
  suffix: { color: '#faad14' },
  actions: { backgroundColor: '#f0f0f0' },
};

const stylesFn: InputNumberProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <InputNumber
        classNames={classNamesObject}
        placeholder="classNames Object"
        style={{ width: 120 }}
      />
      <InputNumber
        disabled
        classNames={classNamesFn}
        placeholder="classNames Function"
        style={{ width: 120 }}
      />
    </Flex>
    <Flex gap="small">
      <InputNumber
        styles={stylesObject}
        placeholder="styles Object"
        prefix="$"
        suffix="USD"
        style={{ width: 150 }}
      />
      <InputNumber
        size="large"
        styles={stylesFn}
        placeholder="styles Function"
        style={{ width: 120 }}
      />
    </Flex>
  </Space>
);

export default App;
