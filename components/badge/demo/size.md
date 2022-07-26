---
order: 7
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

可以设置有数字徽标的大小。

## en-US

Set size of numeral Badge.

```tsx
import { Avatar, Badge } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Badge size="default" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge size="small" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </>
);

export default App;
```
