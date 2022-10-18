import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

const App: React.FC = () => (
  <>
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);

export default App;
