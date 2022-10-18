import React from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

const App: React.FC = () => (
  <>
    <Badge dot>
      <NotificationOutlined style={{ fontSize: 16 }} />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </>
);

export default App;
