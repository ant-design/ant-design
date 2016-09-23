---
order: 1
title:
  zh-CN: 大数字
  en-US: Overflowed count
---

## zh-CN

超过 99 的会显示为 `99+`。

## en-US

`99+` is displayed when count is larger than `99`.

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={99}>
    <a href="#" className="head-example" />
  </Badge>
  <Badge count={200}>
    <a href="#" className="head-example" />
  </Badge>
</div>, mountNode);
````
