---
order: 5
title:
  zh-CN: 自定义位置偏移
  en-US: Offset
---

## zh-CN

设置状态点的位置偏移。

## en-US

Set offset of the badge dot.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <Badge count={5} offset={[10, 10]}>
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode,
);
```
