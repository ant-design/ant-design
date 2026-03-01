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
  <Space vertical>
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
      <Space style={{ width: '100%' }} vertical>
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
      <Space style={{ width: '100%' }} vertical>
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
      <Space style={{ width: '100%' }} vertical>
        <Select style={{ width: '100%' }} defaultValue="a10" options={options} />
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          defaultValue={['a10', 'c12']}
          options={options}
        />
      </Space>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        components: {
          Select: {
            activeShadow: '0 0 0 4px rgba(24, 144, 255, 0.2)',
            errorActiveShadow: '0 0 0 4px rgba(255, 77, 79, 0.2)',
            warningActiveShadow: '0 0 0 4px rgba(255, 177, 0, 0.2)',
          },
        },
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <strong>Active Shadow Demo</strong>
        <p>Click on the select boxes to see the custom active shadows</p>
      </div>
      <Space style={{ width: '100%' }} vertical>
        <Select
          style={{ width: '100%' }}
          defaultValue="a10"
          options={options}
          placeholder="Normal state active shadow"
        />
        <Select
          style={{ width: '100%' }}
          defaultValue="a10"
          options={options}
          status="error"
          placeholder="Error state active shadow"
        />
        <Select
          style={{ width: '100%' }}
          defaultValue="a10"
          options={options}
          status="warning"
          placeholder="Warning state active shadow"
        />
      </Space>
    </ConfigProvider>
  </Space>
);

export default App;
