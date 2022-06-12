---
order: 9
title:
  zh-CN: 迷你版点状步骤条
  en-US: Dot Style Size Small
debug: true
---

## zh-CN

包含步骤点的进度条。

## en-US

Steps with progress dot style.

```tsx
import { Divider, Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

const App: React.FC = () => (
  <>
    <Steps progressDot current={1} size="small">
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
    <Divider />
    <Steps progressDot current={1} direction="vertical" size="small">
      <Step title="Finished" description="This is a description. This is a description." />
      <Step title="Finished" description="This is a description. This is a description." />
      <Step title="In Progress" description="This is a description. This is a description." />
      <Step title="Waiting" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </>
);

export default App;
```
