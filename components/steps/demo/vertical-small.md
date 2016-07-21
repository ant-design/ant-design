---
order: 5
title: 竖直方向的小型步骤条
---

简单的竖直方向的小型步骤条。

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps direction="vertical" size="small" current={1}>
    <Step title="已完成" description="这里是多信息的描述" />
    <Step title="进行中" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
    <Step title="待运行" description="这里是多信息的描述" />
  </Steps>
, mountNode);
````
