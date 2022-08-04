---
order: 2
title:
  zh-CN: 改变
  en-US: Changer
---

## zh-CN

改变每页显示条目数。

## en-US

Change `pageSize`.

```tsx
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React from 'react';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};

const App: React.FC = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);

export default App;
```
