import { Button, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space direction="vertical">
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Align edge / 边缘对齐</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
      <Button>Arrow points to center / 箭头指向中心</Button>
    </Tooltip>
  </Space>
);

export default App;
