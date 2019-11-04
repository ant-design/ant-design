---
order: 11
title:
  zh-CN: 进度条
  en-US: Progress bar
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress percent={0} type="steps" stepsCount={10} strokeColor="#1890ff" />
    <Progress percent={10} type="steps" showInfo={true} stepsCount={10} strokeColor="#1890ff" />
    <Progress percent={20} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={30} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={40} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={50} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={60} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={70} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={80} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={90} type="steps" stepsCount={6} strokeColor="#1890ff" />
    <Progress percent={100} type="steps" stepsCount={6} strokeColor="#1890ff" />
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
