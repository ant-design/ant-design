import React from 'react';
import { Select, Space } from 'antd';

const App: React.FC = () => (
  <Space wrap>
    <Select
      placeholder="Borderless"
      style={{ width: 120 }}
      variant="borderless"
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
      ]}
    />
    <Select
      placeholder="Borderless"
      style={{ width: 120 }}
      disabled
      variant="borderless"
      options={[{ value: 'lucy', label: 'Lucy' }]}
    />
  </Space>
);

export default App;
