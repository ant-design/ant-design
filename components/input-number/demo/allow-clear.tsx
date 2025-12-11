import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => {
  return (
    <Space size="large" orientation="vertical">
      <InputNumber
        placeholder="Basic"
        allowClear
        onChange={onChange}
        style={{
          width: '100%',
        }}
      />
      <InputNumber
        style={{
          width: '100%',
        }}
        placeholder="Custom clear icon"
        allowClear={{ clearIcon: '✖' }}
        onChange={onChange}
      />
    </Space>
  );
};

export default App;
