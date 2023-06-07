import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <Badge dot>
      <NotificationOutlined style={{ fontSize: 16 }} />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </Space>
);

export default App;
