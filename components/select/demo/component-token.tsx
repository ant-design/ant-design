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
  <Space direction="vertical">
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
    <ConfigProvider
      theme={{
        token: {
          controlHeightSM: 28,
        },
      }}
    >
      <Space style={{ width: '100%' }} direction="vertical">
        <Select
          mode="multiple"
          allowClear
          size="small"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          options={options}
        />
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          options={options}
        />
      </Space>
    </ConfigProvider>
  </Space>
);

export default App;
