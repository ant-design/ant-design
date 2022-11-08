---
order: 14
title:
  zh-CN: 标签放置位置
  en-US: Label Placement
---

## zh-CN

修改标签放置位置为 `vertical`。

## en-US

Set labelPlacement to `vertical`.

```tsx
import { Steps } from 'antd';
import React from 'react';

const description = 'This is a description.';
const items = [
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
];
const App: React.FC = () => (
  <>
    <Steps current={1} labelPlacement="vertical" items={items} />
    <br />
    <Steps current={1} percent={60} labelPlacement="vertical" items={items} />
    <br />
    <Steps current={1} size="small" labelPlacement="vertical" items={items} />
  </>
);

export default App;
```
