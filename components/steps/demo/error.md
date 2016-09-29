---
order: 6
title:
  zh-CN: 步骤运行错误
  en-US: Error status
---

## zh-CN

使用 Steps 的 `status` 属性来指定当前步骤的状态。

## en-US

By using `status` of `Steps`, you can specify the state for current step.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps current={1} status="error">
    <Step title="finished" description="This is description" />
    <Step title="In Process" description="This is description" />
    <Step title="Waiting" description="This is description" />
  </Steps>
, mountNode);
````
