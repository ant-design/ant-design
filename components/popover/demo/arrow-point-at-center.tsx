import { Button, Popover } from 'antd';
import React from 'react';

const content = (
  <>
    <p>Content</p>
    <p>Content</p>
  </>
);

const App: React.FC = () => (
  <>
    <Popover placement="topLeft" title="Title" content={content}>
      <Button>Align edge / 边缘对齐</Button>
    </Popover>
    <Popover placement="topLeft" title="Title" content={content} arrowPointAtCenter>
      <Button>Arrow points to center / 箭头指向中心</Button>
    </Popover>
  </>
);

export default App;
