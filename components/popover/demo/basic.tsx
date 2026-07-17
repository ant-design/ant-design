import React from 'react';
import { Button, Popover } from 'antd';

const content = (
  <div>
    <p style={{ margin: 0 }}>Content</p>
    <p style={{ margin: 0 }}>Content</p>
  </div>
);

const App: React.FC = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default App;
