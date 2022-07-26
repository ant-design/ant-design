---
order: 3
title:
  zh-CN: 垂直分割线
  en-US: Vertical
---

## zh-CN

使用 `type="vertical"` 设置为行内的垂直分割线。

## en-US

Use `type="vertical"` make it vertical.

```tsx
import { Divider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </>
);

export default App;
```
