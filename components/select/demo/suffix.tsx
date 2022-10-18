import React from 'react';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const smileIcon = <SmileOutlined />;
const mehIcon = <MehOutlined />;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <>
    <Select
      suffixIcon={smileIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      suffixIcon={mehIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      disabled
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);

export default App;
