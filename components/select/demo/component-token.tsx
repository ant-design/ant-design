import React from 'react';
import { ConfigProvider, Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Select: {
          multipleItemBorderColor: 'rgba(0,0,0,0.06)',
          multipleItemBorderColorDisabled: 'rgba(0,0,0,0.06)',
          optionSelectedColor: '#1677ff',
        },
      },
    }}
  >
    <Space style={{ width: '100%' }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        options={options}
      />
      <Select
        mode="multiple"
        disabled
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        options={options}
      />
    </Space>
  </ConfigProvider>
);

export default App;
