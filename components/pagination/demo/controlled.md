---
order: 8
title:
  zh-CN: 受控
  en-US: Controlled
---

## zh-CN

受控制的页码。

## en-US

Controlled page number.

```jsx
import { Pagination } from 'antd';

export default () => {
  const [current, setCurrent] = React.useState(3);

  const onChange = page => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
};
```
