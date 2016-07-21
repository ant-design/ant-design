---
order: 0
title: 基本用法
---

简单的步骤条。

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
