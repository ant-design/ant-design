---
order: 1
title: 迷你版
---

迷你版的步骤条，通过设置 `<Steps size="small">` 启用.

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
