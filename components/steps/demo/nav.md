---
order: 11
title:
  zh-CN: 导航步骤
  en-US: Navigation Steps
---

## zh-CN

导航类型的步骤条。

## en-US

Navigation steps.

```tsx
import { Steps } from 'antd';
import React, { useState } from 'react';

const { Step } = Steps;

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        <Step
          title="Step 1"
          subTitle="00:00:05"
          status="finish"
          description="This is a description."
        />
        <Step
          title="Step 2"
          subTitle="00:01:02"
          status="process"
          description="This is a description."
        />
        <Step
          title="Step 3"
          subTitle="waiting for longlong time"
          status="wait"
          description="This is a description."
        />
      </Steps>
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        <Step status="finish" title="Step 1" />
        <Step status="process" title="Step 2" />
        <Step status="wait" title="Step 3" />
        <Step status="wait" title="Step 4" />
      </Steps>
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
      >
        <Step status="finish" title="finish 1" />
        <Step status="finish" title="finish 2" />
        <Step status="process" title="current process" />
        <Step status="wait" title="wait" disabled />
      </Steps>
    </>
  );
};

export default App;
```

```css
[data-theme='compact'] .site-navigation-steps,
.site-navigation-steps {
  margin-bottom: 60px;
  box-shadow: 0px -1px 0 0 #e8e8e8 inset;
}
```

<style>
[data-theme="dark"] .site-navigation-steps {
  border-bottom: 1px solid #303030;
  margin-bottom: 60px;
  box-shadow: none;
}
</style>
