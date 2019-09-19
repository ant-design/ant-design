---
order: 0
title:
  zh-CN: 进度条
  en-US: Orientation
---

## zh-CN

标准的进度条。

## en-US

By setting `orientaton="vertical"`, you can change the orientantion from horizontal to vertical.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress percent={30} orientation="vertical" />
    <Progress percent={100} size="small" orientation="vertical" />
  </div>,
  mountNode,
);
```
