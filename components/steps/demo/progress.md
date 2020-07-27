---
order: 13
title:
  zh-CN: 带有进度的步骤
  en-US: Steps with progress
---

## zh-CN

带有进度的步骤。

## en-US

Steps with progress.

```jsx
import { Steps, Popover } from 'antd';

const { Step } = Steps;

const progressIconRender = ({ node, percentage }) => {
  return <Popover content={`${percentage}%`}>{node}</Popover>;
};

ReactDOM.render(
  <Steps current={1} percentage={60} progressIcon={progressIconRender}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>,
  mountNode,
);
```
