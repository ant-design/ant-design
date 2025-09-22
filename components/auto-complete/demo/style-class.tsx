import React from 'react';
import { AutoComplete, Flex, Space } from 'antd';
import type { AutoCompleteProps } from 'antd';

const classNamesObject: AutoCompleteProps['classNames'] = {
  root: 'demo-autocomplete-root',
  prefix: 'demo-autocomplete-prefix',
  input: 'demo-autocomplete-input',
  popup: {
    root: 'demo-autocomplete-popup',
    list: 'demo-autocomplete-list',
  },
};

const stylesObject: AutoCompleteProps['styles'] = {
  prefix: { backgroundColor: '#f5f5f5', padding: '4px 8px' },
  input: { fontWeight: 'bold', color: '#1890ff' },
  popup: {
    root: { borderWidth: 3, borderColor: '#1890ff' },
    list: { backgroundColor: '#f9f9f9' },
  },
};

const classNamesFn: AutoCompleteProps['classNames'] = ({ props }) => ({
  root: props?.disabled ? 'demo-autocomplete-root is-disabled' : 'demo-autocomplete-root',
  input: 'demo-autocomplete-input',
  popup: {
    root: 'demo-autocomplete-popup-fn',
  },
});

const stylesFn: AutoCompleteProps['styles'] = ({ props }) => ({
  root: { fontWeight: 'bold', border: props?.variant === 'filled' ? '1px solid #1890ff' : '' },
  popup: {
    root: { backgroundColor: props?.variant === 'filled' ? '#ccc' : '#52c41a' },
  },
});

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const options = [mockVal('Burns Bay Road'), mockVal('Downing Street'), mockVal('Wall Street')];

const App: React.FC = () => {
  return (
    <Space orientation="vertical" size={[8, 24]} style={{ width: '100%' }}>
      <Flex vertical gap="middle">
        <AutoComplete
          options={options}
          placeholder="input here"
          classNames={classNamesObject}
          styles={stylesObject}
          style={{ width: 200 }}
        />
      </Flex>
      <Flex vertical gap="middle">
        <AutoComplete
          variant="filled"
          options={options}
          placeholder="input here"
          styles={stylesFn}
          classNames={classNamesFn}
          style={{ width: 200 }}
        />
      </Flex>
    </Space>
  );
};

export default App;
