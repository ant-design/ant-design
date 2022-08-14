---
order: 14
title:
  zh-CN: 标签放置位置
  en-US: Label Placement
---

## zh-CN

修改标签放置位置为 `vertical`。

## en-US

Set labelPlacement to `vertical`.

```tsx
import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

const App: React.FC = () => (
  <>
    <Steps current={1} labelPlacement="vertical">
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
    <br />
    <Steps current={1} percent={60} labelPlacement="vertical">
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
    <br />
    <Steps current={1} size="small" labelPlacement="vertical">
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </>
);

export default App;
```
