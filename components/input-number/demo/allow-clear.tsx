import React from 'react';
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <InputNumber allowClear defaultValue={100} style={{ width: 120 }} />
    <InputNumber allowClear defaultValue={0} suffix="kg" style={{ width: 120 }} />
    <InputNumber allowClear mode="spinner" defaultValue={0} style={{ width: 150 }} />
  </Space>
);

export default App;
