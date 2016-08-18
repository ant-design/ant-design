---
order: 2
title:
  zh-CN: 带图标的步骤条
  en-US: With icon
---

## zh-CN

通过设置 `Steps.Step` 的 `icon` 属性，可以启用自定义图标。

## en-US

You can use your own custom icons by setting the property `icon` for `Steps.Step`.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps>
    <Step status="finish" title="步骤1" icon="cloud" />
    <Step status="process" title="步骤2" icon="apple" />
    <Step status="wait" title="步骤3" icon="github" />
  </Steps>
, mountNode);
````
