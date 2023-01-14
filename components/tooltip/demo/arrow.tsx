import React from 'react';
import { Button, Tooltip } from 'antd';

const App: React.FC = () => (
  <>
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Align edge / 边缘对齐</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrow={false}>
      <Button>hide arrow / 隐藏箭头</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrow={{ arrowPointAtCenter: true }}>
      <Button>Arrow points to center / 箭头指向中心</Button>
    </Tooltip>
  </>
);

export default App;
