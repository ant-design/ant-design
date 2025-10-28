import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, InputNumber, Select, Space } from 'antd';

const selectBefore = (
  <Select
    defaultValue="add"
    style={{ width: 60 }}
    options={[
      { label: '+', value: 'add' },
      { label: '-', value: 'minus' },
    ]}
  />
);

const selectAfter = (
  <Select
    defaultValue="USD"
    style={{ width: 60 }}
    options={[
      { label: '$', value: 'USD' },
      { label: '€', value: 'EUR' },
      { label: '£', value: 'GBP' },
      { label: '¥', value: 'CNY' },
    ]}
  />
);

const App: React.FC = () => (
  <Space vertical>
    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
    <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
    <InputNumber addonAfter={<SettingOutlined />} defaultValue={100} />
    <InputNumber
      addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
      defaultValue={100}
    />
    <InputNumber
      addonBefore="+"
      addonAfter={<SettingOutlined />}
      defaultValue={100}
      disabled
      controls
    />
    <InputNumber
      prefix="¥"
      addonBefore="+"
      addonAfter={<SettingOutlined />}
      defaultValue={100}
      disabled
      controls
    />
  </Space>
);

export default App;
