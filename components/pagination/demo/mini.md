---
order: 4
title:
  zh-CN: 迷你
  en-US: Mini size
---

## zh-CN

迷你版本。

## en-US

Mini size pagination.

```tsx
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React from 'react';

const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;

const App: React.FC = () => (
  <>
    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
    <Pagination
      size="small"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </>
);

export default App;
```

<style>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
</style>
