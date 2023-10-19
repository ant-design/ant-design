import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Cascader, InputNumber, Select, Space } from 'antd';

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="add" style={{ width: 60 }}>
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);

const App: React.FC = () => (
  <Space direction="vertical">
    <Space.Compact>
      <Button>+</Button>
      <InputNumber defaultValue={100} />
      <Button>$</Button>
    </Space.Compact>
    <Space.Compact>
      {selectBefore}
      <InputNumber defaultValue={100} />
      {selectAfter}
    </Space.Compact>
    <Space.Compact>
      <InputNumber defaultValue={100} />
      <Button>
        <SettingOutlined />
      </Button>
    </Space.Compact>
    <Space.Compact>
      <Cascader placeholder="cascader" style={{ width: 150 }} />
      <InputNumber defaultValue={100} />
    </Space.Compact>
    <Space.Compact>
      <Button disabled>+</Button>
      <InputNumber defaultValue={100} disabled controls />
      <Button disabled>
        <SettingOutlined />
      </Button>
    </Space.Compact>
    <Space.Compact>
      <Button disabled>+</Button>
      <InputNumber prefix="¥" defaultValue={100} disabled controls />
      <Button disabled>
        <SettingOutlined />
      </Button>
    </Space.Compact>
  </Space>
);

export default App;
