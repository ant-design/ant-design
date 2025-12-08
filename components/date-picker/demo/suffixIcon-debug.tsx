import React from 'react';
import { DatePicker, Space } from 'antd';

const App: React.FC = () => (
  <Space orientation="vertical">
    <DatePicker suffixIcon />
    <DatePicker suffixIcon={false} />
    <DatePicker />
    <DatePicker suffixIcon={null} />
    <DatePicker suffixIcon={'123'} />
  </Space>
);

export default App;
