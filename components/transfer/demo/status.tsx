import React from 'react';
import { Space, Transfer } from 'antd';

const App = () => (
  <Space direction="vertical">
    <Transfer status="error" />
    <Transfer status="warning" showSearch />
  </Space>
);

export default App;
