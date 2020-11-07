---
order: 4
title:
  zh-CN: 基本用法
  en-US: Yellow-Messenger
---

## zh-CN

简单的步骤条。

## en-US

Used by YM

```jsx
import { Steps } from 'antd';

const { Step } = Steps;

ReactDOM.render(
  <Steps labelPlacement="vertical" size="small" current={1}>
    <Step description="Basic info" />
    <Step description="Channels" />
    <Step description="Configure Atom" />
    <Step description="Fallback options" />
    <Step description="Get started" />
  </Steps>,
  mountNode,
);
```
