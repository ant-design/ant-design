---
order: 1
title: 大数字
---

超过 99 的会显示为 `99+`。

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={99}>
    <a href="#" className="head-example"></a>
  </Badge>
  <Badge count={200}>
    <a href="#" className="head-example"></a>
  </Badge>
</div>, mountNode);
````
