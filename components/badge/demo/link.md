---
order: 3
title:
  zh-CN: 可点击
  en-US: Clickable
---

## zh-CN

用 a 标签进行包裹即可。

## en-US

The badge can be wrapped with `a` tag to make it linkable.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <a href="#">
    <Badge count={5}>
      <span className="head-example" />
    </Badge>
  </a>,
  mountNode,
);
```
