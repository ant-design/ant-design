---
order: 8
title:
  zh-CN: 点状步骤条
  en-US: Dot Style
---

## zh-CN

包含步骤点的进度条。

## en-US

Steps with progress dot style.

```jsx
import { Steps } from 'antd';

const { Step } = Steps;

ReactDOM.render(
  <Steps progressDot current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>,
  mountNode,
);
```
