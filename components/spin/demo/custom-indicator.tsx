import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';

const App: React.FC = () => (
  <Space>
    <Spin indicator={<LoadingOutlined spin />} size="small" />
    <Spin indicator={<LoadingOutlined spin />} />
    <Spin indicator={<LoadingOutlined spin />} size="large" />
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Space>
);

export default App;
