---
order: 7
title:
  zh-CN: 垂直标题
  en-US: Vertical Title
---

## zh-CN

标题垂直排列的步骤条。

## en-US

A step bar with vertical title.

````__react
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(
  <Steps labelPlacement="vertical" current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description. This is a description." />
    <Step title="Waiting" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
, mountNode);
````
