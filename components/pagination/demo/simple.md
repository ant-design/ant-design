---
order: 6
title:
  zh-CN: 简洁
  en-US: Simple mode
---

## zh-CN

简单的翻页。

## en-US

Simple mode.

```tsx
import { Pagination } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Pagination simple defaultCurrent={2} total={50} />
    <br />
    <Pagination disabled simple defaultCurrent={2} total={50} />
  </>
);

export default App;
```
