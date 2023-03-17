import { Space, Tag } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space wrap>
    <Tag bordered={false}>Tag 1</Tag>
    <Tag bordered={false}>Tag 2</Tag>
    <Tag bordered={false}>Tag 3</Tag>
  </Space>
);

export default App;
