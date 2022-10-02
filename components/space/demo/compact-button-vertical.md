---
order: 3
title:
  zh-CN: Button 垂直方向紧凑布局
  en-US: Button vertical Compact Mode
---

## zh-CN

Button 垂直方向紧凑布局。

## en-US

Space.Compact vertical example for Button.

```tsx
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <Space.Compact size="small" direction="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
      <Button type="primary">Button 4</Button>
    </Space.Compact>
    <Space.Compact direction="vertical">
      <Button size="large">Button 1</Button>
      <Button size="large">Button 2</Button>
      <Button size="large">Button 3</Button>
      <Button size="large">Button 4</Button>
    </Space.Compact>
    <Space.Compact direction="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
      <Button type="primary">Button 4</Button>
    </Space.Compact>
    <Space.Compact direction="vertical">
      <Button type="dashed">Button 1</Button>
      <Button type="dashed">Button 2</Button>
      <Button type="dashed">Button 3</Button>
      <Button type="dashed">Button 4</Button>
    </Space.Compact>
    <Space.Compact size="large" direction="vertical">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </Space.Compact>
  </Space>
);

export default App;
```
