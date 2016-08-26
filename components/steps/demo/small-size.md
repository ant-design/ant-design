---
order: 1
title:
  zh-CN: 迷你版
  en-US: Mini version
---

## zh-CN

迷你版的步骤条，通过设置 `<Steps size="small">` 启用.

## en-US

By setting like this: `<Steps size="small">`, you can get a mini version.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps size="small" current={1}>
    <Step title="已完成" />
    <Step title="进行中" />
    <Step title="待运行" />
    <Step title="待运行" />
  </Steps>
, mountNode);
````
