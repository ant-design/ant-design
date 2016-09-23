---
order: 6
title:
  zh-CN: 封顶数字
  en-US: Customized overflow count
---

## zh-CN

超过 `overflowCount` 的会显示为 `${overflowCount}+`。

## en-US

`${overflowCount}+` is displayed when count is larger than `overflowCount`.

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={99} overflowCount={10}>
    <a href="#" className="head-example" />
  </Badge>
  <Badge count={1000} overflowCount={999}>
    <a href="#" className="head-example" />
  </Badge>
</div>, mountNode);
````
