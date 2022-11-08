---
order: -1
title:
  zh-CN: 基本用法（废弃的语法糖）
  en-US: Basic (deprecated syntactic sugar)
version: < 4.24.0
---

## zh-CN

简单的步骤条。

## en-US

The most basic step bar.

```tsx
import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;
const description = 'This is a description.';
const App: React.FC = () => (
  <Steps current={1}>
    <Step title="Finished" description={description} />
    <Step title="In Progress" description={description} subTitle="Left 00:00:08" />
    <Step title="Waiting" description={description} />
  </Steps>
);

export default App;
```
