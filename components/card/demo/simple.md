---
order: 2
title:
  zh-CN: 简洁卡片
  en-US: Simple card
---

## zh-CN

只包含内容区域。

## en-US

A simple card only containing a content area.

```tsx
import { Card } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Card style={{ width: 300 }}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

export default App;
```
