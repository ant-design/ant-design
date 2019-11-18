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
    <Progress percent={50} type="steps" strokeColor="#1890ff" />
    <Progress percent={80} type="steps" strokeColor="#1890ff" width={60} />
    <Progress percent={100} type="steps" count={5} strokeColor="#1890ff" width={80} />
  </div>,
  mountNode,
);
```

<style>
div.ant-progress-steps {
  margin-right: 10px;
  margin-top: 10px;
  display: block;
}
</style>
