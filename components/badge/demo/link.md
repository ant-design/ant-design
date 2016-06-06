---
order: 2
title: 可点击
---

用 a 标签进行包裹即可。

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <a href="#">
    <Badge count={5}>
      <span className="head-example"></span>
    </Badge>
  </a>
, mountNode);
````
