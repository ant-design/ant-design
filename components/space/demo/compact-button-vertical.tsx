import React from 'react';
import { Button, Space } from 'antd';

const App: React.FC = () => (
  <Space>
    <Space.Compact orientation="vertical">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Space.Compact>
    <Space.Compact orientation="vertical">
      <Button type="dashed">Button 1</Button>
      <Button type="dashed">Button 2</Button>
      <Button type="dashed">Button 3</Button>
    </Space.Compact>
    <Space.Compact orientation="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
    </Space.Compact>
  </Space>
);

export default App;
