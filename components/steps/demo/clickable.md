---
order: 10
title:
  zh-CN: 可点击
  en-US: Clickable
---

## zh-CN

设置 `onChange` 后，Steps 变为可点击状态。

## en-US

Setting `onChange` makes Steps clickable.

```tsx
import { Divider, Steps } from 'antd';
import React, { useState } from 'react';

const { Step } = Steps;

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', current);
    setCurrent(value);
  };

  return (
    <>
      <Steps current={current} onChange={onChange}>
        <Step title="Step 1" description="This is a description." />
        <Step title="Step 2" description="This is a description." />
        <Step title="Step 3" description="This is a description." />
      </Steps>

      <Divider />

      <Steps current={current} onChange={onChange} direction="vertical">
        <Step title="Step 1" description="This is a description." />
        <Step title="Step 2" description="This is a description." />
        <Step title="Step 3" description="This is a description." />
      </Steps>
    </>
  );
};

export default App;
```
