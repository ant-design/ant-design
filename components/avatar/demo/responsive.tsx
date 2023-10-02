import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const App: React.FC = () => (
  <Avatar
    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    icon={<AntDesignOutlined />}
  />
);

export default App;
