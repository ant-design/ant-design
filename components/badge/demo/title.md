---
order: 100
title:
  zh-CN: 自定义标题
  en-US: Title
debug: true
---

## zh-CN

设置鼠标放在状态点上时显示的文字。

## en-US

The badge will display `title` when hovered over, instead of `count`.

```jsx
import { Badge, Avatar } from 'antd';

ReactDOM.render(
  <>
    <Badge count={5} title="Custom hover text">
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={-5} title="Negative">
      <Avatar shape="square" size="large" />
    </Badge>
  </>,
  mountNode,
);
```
