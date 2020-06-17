---
order: 8
title:
  zh-CN: 仪表盘
  en-US: Dashboard
---

## zh-CN

通过设置 `type=dashboard`，可以很方便地实现仪表盘样式的进度条。若想要修改缺口的角度，可以设置 `gapDegree` 为你想要的值。

## en-US

By setting `type=dashboard`, you can get a dashboard style of progress easily. Modify `gapDegree` to set the degree of gap.

```jsx
import { Progress } from 'antd';

ReactDOM.render(
  <>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </>,
  mountNode,
);
```
