---
order: 11
title:
  zh-CN: 上一步和下一步
  en-US: Prev and next
---

## zh-CN

修改上一步和下一步为文字链接。

## en-US

Use text link for prev and next button.

```tsx
import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const App: React.FC = () => <Pagination total={500} itemRender={itemRender} />;

export default App;
```
