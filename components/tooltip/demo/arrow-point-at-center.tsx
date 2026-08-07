import React from 'react';
import { Button, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Align edge</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrow={{ pointAtCenter: true }}>
      <Button>Arrow points to center</Button>
    </Tooltip>
  </Space>
);

export default App;
