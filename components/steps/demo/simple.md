---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

简单的步骤条。

## en-US

The most basic step bar.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps current={1}>
    <Step title="已完成" description="这里是多信息的描述" />
    <Step title="进行中" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
  </Steps>
, mountNode);
````
