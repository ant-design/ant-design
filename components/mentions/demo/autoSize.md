---
order: 6
title:
  zh-CN: 自动大小
  en-US: autoSize
---

## zh-CN

自适应内容高度。

## en-US

Height autoSize.

```tsx
import React from 'react';
import { Mentions } from 'antd';

const App: React.FC = () => (
  <Mentions
    autoSize
    style={{ width: '100%' }}
    options={[
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]}
  />
);

export default App;
```
