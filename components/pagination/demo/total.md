---
order: 9
title:
  zh-CN: 总数
  en-US: Total number
---

## zh-CN

通过设置 `showTotal` 展示总共有多少数据。

## en-US

You can show the total number of data by setting `showTotal`.

```tsx
import { Pagination } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Pagination
      total={85}
      showTotal={total => `Total ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  </>
);

export default App;
```
