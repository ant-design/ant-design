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

const App: React.FC = () => (
  <Space direction="vertical">
    <ConfigProvider
      theme={{
        components: {
          Select: {
            multipleItemBorderColor: 'rgba(0,0,0,0.06)',
            multipleItemBorderColorDisabled: 'rgba(0,0,0,0.06)',
            optionSelectedColor: '#1677ff',
            hoverBorderColor: 'red',
            activeBorderColor: 'green',
            activeOutlineColor: 'pink',
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
          options={options}
        />
        <Select
          mode="multiple"
          disabled
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
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
          options={options}
        />
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          options={options}
        />
      </Space>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            paddingXXS: 0,
            controlHeight: 28,
          },
        },
      }}
    >
      <Space style={{ width: '100%' }} direction="vertical">
        <Select style={{ width: '100%' }} defaultValue="a10" options={options} />
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          defaultValue={['a10', 'c12']}
          options={options}
        />
      </Space>
    </ConfigProvider>
  </Space>
);

export default App;
