---
order: 8
title:
  zh-CN: 仪表盘
  en-US: Dashboard
---

## zh-CN

通过设置 `type=dashboard`，可以很方便地实现仪表盘样式的进度条。

## en-US

By setting `type=dashboard`, you can get a dashboard style of progress easily.

```jsx
import { Progress } from 'antd';

ReactDOM.render(<Progress type="dashboard" percent={75} />, mountNode);
```
