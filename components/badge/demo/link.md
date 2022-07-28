---
order: 5
title:
  zh-CN: 可点击
  en-US: Clickable
---

## zh-CN

用 a 标签进行包裹即可。

## en-US

The badge can be wrapped with `a` tag to make it linkable.

```tsx
import { Avatar, Badge } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <a href="#">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </a>
);

export default App;
```
