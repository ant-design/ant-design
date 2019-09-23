---
order: 0
title:
  zh-CN: 取向
  en-US: Orientation
---

## zh-CN

标准的进度条。

## en-US

By setting `orientaton="vertical"`, you can change the orientantion from horizontal to vertical.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div style={{ width: 170, height: 130, paddingTop: 45 }}>
    <Progress percent={70} size="small" orientation="vertical" showInfo />
  </div>,
  mountNode,
);
```
