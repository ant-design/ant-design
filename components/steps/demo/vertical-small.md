---
order: 5
title:
  zh-CN: 竖直方向的小型步骤条
  en-US: Vertical mini version
---

## zh-CN

简单的竖直方向的小型步骤条。

## en-US

A simple mini version step bar in the vertical direction.

```tsx
import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

const App: React.FC = () => (
  <Steps direction="vertical" size="small" current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);

export default App;
```
