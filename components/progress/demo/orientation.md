---
order: 11
title:
  zh-CN: 方向
  en-US: Orientation
---

## zh-CN

通过设置`orientaton=“vertical”`，可以将方向从水平更改为垂直。

## en-US

By setting `orientation="vertical"`, you can change the orientation from horizontal to vertical.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div style={{ width: 170, height: 130, paddingTop: 45 }}>
    <Progress percent={70} size="small" orientation="vertical" showInfo />
  </div>,
  mountNode,
);
```
