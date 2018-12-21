---
order: 2
title:
  zh-CN: 封顶数字
  en-US: Overflow Count
---

## zh-CN

超过 `overflowCount` 的会显示为 `${overflowCount}+`，默认的 `overflowCount` 为 `99`。

## en-US

`${overflowCount}+` is displayed when count is larger than `overflowCount`. The default value of `overflowCount` is `99`.

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <Badge count={99}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={100}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode
);
````
