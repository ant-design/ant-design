import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const App: React.FC = () => (
  <>
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </>
);

export default App;
