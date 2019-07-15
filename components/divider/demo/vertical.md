---
order: 2
title:
  zh-CN: 垂直分割线
  en-US: Vertical
---

## zh-CN

使用 `type="vertical"` 设置为行内的垂直分割线。

## en-US

Use `type="vertical"` make it vertical.

```jsx
import { Divider } from 'antd';

ReactDOM.render(
  <div>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </div>,
  mountNode,
);
```
