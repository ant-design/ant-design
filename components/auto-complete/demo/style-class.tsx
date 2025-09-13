import React from 'react';
import { AutoComplete, Flex, Space } from 'antd';

const classNamesObject = {
  root: 'demo-autocomplete-root',
  prefix: 'demo-autocomplete-prefix',
  input: 'demo-autocomplete-input',
};

const stylesObject = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 4 },
  prefix: { backgroundColor: '#f5f5f5', padding: '4px 8px' },
  input: { fontWeight: 'bold', color: '#1890ff' },
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const options = [mockVal('Burns Bay Road'), mockVal('Downing Street'), mockVal('Wall Street')];

const App: React.FC = () => {
  return (
    <Space size={[8, 24]} direction="vertical" style={{ width: '100%' }}>
      <Flex vertical gap="middle">
        <h4>classNames Object</h4>
        <AutoComplete
          options={options}
          placeholder="input here"
          classNames={classNamesObject}
          style={{ width: 200 }}
        />
      </Flex>
      <Flex vertical gap="middle">
        <h4>styles Object</h4>
        <AutoComplete
          options={options}
          placeholder="input here"
          styles={stylesObject}
          style={{ width: 200 }}
        />
      </Flex>
    </Space>
  );
};

export default App;
