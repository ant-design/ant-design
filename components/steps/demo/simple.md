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
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>,
  mountNode
);
````
