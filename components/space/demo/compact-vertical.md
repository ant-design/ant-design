---
order: 5
title:
  zh-CN: 垂直方向紧凑布局
  en-US: Vertical Compact Mode
---

## zh-CN

垂直方向的紧凑布局。

## en-US

Vertical Compact Mode6.

```tsx
import { Button, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <Space>
      <Space.Compact direction="vertical">
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
      </Space.Compact>
      <Space.Compact direction="vertical">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space.Compact>
      <Space.Compact direction="vertical">
        <Button type="link">Button 1</Button>
        <Button type="link">Button 2</Button>
        <Button type="link">Button 3</Button>
      </Space.Compact>
    </Space>
  </div>
);

export default App;
```
