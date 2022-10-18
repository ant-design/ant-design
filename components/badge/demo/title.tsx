/*
 * debug: true
 */

import { Avatar, Badge } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Badge count={5} title="Custom hover text">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={-5} title="Negative">
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);

export default App;
