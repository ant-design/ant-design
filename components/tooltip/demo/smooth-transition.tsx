import React from 'react';
import { Button, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space>
    <Tooltip title="First tooltip" mouseEnterDelay={0.3} mouseLeaveDelay={0.3}>
      <Button>First Button</Button>
    </Tooltip>
    <Tooltip title="Second tooltip" mouseEnterDelay={0.3} mouseLeaveDelay={0.3}>
      <Button>Second Button</Button>
    </Tooltip>
  </Space>
);

export default App;
