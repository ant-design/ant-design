import { SettingOutlined } from '@ant-design/icons';
import { Button, Cascader, InputNumber, Select, Space } from 'antd';
import React from 'react';

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

const App: React.FC = () => {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <Space direction="vertical">
      <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
      <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={100} />
      <InputNumber addonAfter={<SettingOutlined />} defaultValue={100} />
      <InputNumber
        addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
        defaultValue={100}
      />
      <InputNumber defaultValue={100} disabled={disabled} controls />
      <InputNumber prefix="¥" defaultValue={100} disabled={disabled} controls />
      <InputNumber
        addonBefore="+"
        addonAfter={<SettingOutlined />}
        defaultValue={100}
        disabled={disabled}
        controls
      />
      <InputNumber
        prefix="¥"
        addonBefore="+"
        addonAfter={<SettingOutlined />}
        defaultValue={100}
        disabled={disabled}
        controls
      />
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => setDisabled((v) => !v)} type="primary">
          Toggle disabled
        </Button>
      </div>
    </Space>
  );
};

export default App;
