---
order: 1
title:
  zh-CN: 进度圈
  en-US: Circular progress bar
---

## zh-CN

圈形的进度。

## en-US

A circular progress bar.

```tsx
import { Progress } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Progress type="circle" percent={75} style={{ marginRight: 8 }} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} style={{ marginLeft: 8 }} />
  </>
);

export default App;
```
