import React from 'react';
import { Avatar, Badge } from 'antd';

const App: React.FC = () => (
  <>
    <Badge size="default" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge size="small" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);

export default App;
