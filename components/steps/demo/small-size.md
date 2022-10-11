---
order: 1
title:
  zh-CN: 迷你版
  en-US: Mini version
---

## zh-CN

迷你版的步骤条，通过设置 `<Steps size="small">` 启用.

## en-US

By setting like this: `<Steps size="small">`, you can get a mini version.

```tsx
import { Steps } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Steps
    size="small"
    current={1}
    items={[
      {
        title: 'Finished',
      },
      {
        title: 'In Progress',
      },
      {
        title: 'Waiting',
      },
    ]}
  />
);

export default App;
```
