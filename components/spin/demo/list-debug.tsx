import React from 'react';
import { List, Spin } from 'antd';

const App: React.FC = () => (
  <List
    dataSource={['Apple', 'Banana']}
    renderItem={(item) => <List.Item extra={<Spin size="small" />}>{item}</List.Item>}
  />
);

export default App;
