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
    <Step title="已完成" description="这里是多信息的描述" />
    <Step title="进行中" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
  </Steps>
, mountNode);
````
