---
order: 3
title:
  zh-CN: 响应式进度圈
  en-US: Responsive circular progress bar
---

## zh-CN

响应式的圈形进度，当 `width` 小于等于 20 的时候，进度信息将不会显示在进度圈里面，而是以 Tooltip 的形式显示。

## en-US

Responsive circular progress bar. When `width` is smaller than 20, progress information will be displayed in Tooltip.

```tsx
import { Progress, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space size={8}>
    <Progress
      type="circle"
      percent={60}
      strokeWidth={20}
      width={14}
      format={number => `进行中，已完成${number}%`}
    />
    代码发布
  </Space>
);

export default App;
```
