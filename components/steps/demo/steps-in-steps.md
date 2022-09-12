---
order: 99
debug: true
title:
  zh-CN: Steps 嵌套 Steps
  en-US: Steps inside Steps
---

## zh-CN

测试 Steps 嵌套 Steps 的样式。

## en-US

Test style of Steps inside Steps.

```tsx
import type { StepsProps } from 'antd';
import { Card, Radio, Steps } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [size, setSize] = useState<StepsProps['size']>('default');
  const description = 'This is a description.';
  const horizontalSteps = (
    <Card>
      <Steps
        size={size}
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </Card>
  );

  return (
    <>
      <Radio.Group
        style={{ marginBottom: 16 }}
        value={size}
        onChange={e => setSize(e.target.value)}
      >
        <Radio value="small">Small</Radio>
        <Radio value="default">Default</Radio>
      </Radio.Group>
      <Steps
        size={size}
        direction="vertical"
        items={[
          {
            title: 'Finished',
            description: horizontalSteps,
          },
          {
            title: 'In Progress',
            description,
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </>
  );
};

export default App;
```
