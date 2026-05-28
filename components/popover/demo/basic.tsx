import React from 'react';
import { Button, Popover } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <Popover content={content} open title="Title" color="rgba(0, 0, 0, 0.56)">
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default App;
