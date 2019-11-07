---
order: 11
title:
  zh-CN: 步骤进度条
  en-US: Progress bar with steps
---

## zh-CN

带步骤的进度条。

## en-US

A progress bar with steps.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress percent={10} type="steps" showInfo={true} stepsCount={10} strokeColor="#1890ff" />
    <Progress percent={40} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={50} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={70} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={80} type="steps" showInfo={false} stepsCount={6} strokeColor="#1890ff" />
  </div>,
  mountNode,
);
```

<style>
div.ant-progress-steps {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
