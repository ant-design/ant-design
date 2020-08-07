---
order: 10
title:
  zh-CN: 全部展示
  en-US: Show All
---

## zh-CN

展示所有配置选项。

## en-US

Show all configured prop.

```jsx
import { Pagination } from 'antd';

ReactDOM.render(
  <>
    <Pagination
      total={85}
      showSizeChanger
      showQuickJumper
      showTotal={total => `Total ${total} items`}
    />
  </>,
  mountNode,
);
```
