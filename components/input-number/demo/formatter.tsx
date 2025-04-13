import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => (
  <Space>
    <InputNumber<number>
      defaultValue={1000}
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
      onChange={onChange}
    />
    <InputNumber<number>
      defaultValue={100}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value?.replace('%', '') as unknown as number}
      onChange={onChange}
    />
  </Space>
);

export default App;
