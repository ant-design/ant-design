---
order: 99
title:
  zh-CN: count 和 stauts/color 共用
  en-US: count with custom stauts/color
debug: true
---

## zh-CN

测试 `count` 和 `stauts/color` 共用的情况。

## en-US

Using `count` with custom `stauts/color`.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <>
    <Badge count={5} status="success">
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={5} status="warning">
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={5} color="blue">
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={5} color="#fa541c">
      <a href="#" className="head-example" />
    </Badge>
  </>,
  mountNode,
);
```
