---
order: 3
title:
  zh-CN: 微型进度圈
  en-US: Micro size circular progress bar
---

## zh-CN

响应式的圈形进度，当 `width` 小于等于 20 的时候，进度信息将不会显示在进度圈里面，而是以 Tooltip 的形式显示。

## en-US

A least circular progress bar.

```tsx
import { Progress } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Progress type="circle" percent={30} strokeWidth={20} width={20} />
    <Progress type="circle" percent={70} strokeWidth={20} width={16} status="exception" />
    <Progress type="circle" percent={100} strokeWidth={20} width={12} />
  </>
);

export default App;
```
