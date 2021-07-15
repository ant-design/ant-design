---
order: 9
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

可以设置有数字徽标的大小。

## en-US

Set size of numeral Badge.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <>
    <Badge size="default" count={5}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge size="small" count={5}>
      <a href="#" className="head-example" />
    </Badge>
  </>,
  mountNode,
);
```
