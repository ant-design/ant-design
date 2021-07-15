---
order: 9
title:
  zh-CN: 分段进度条
  en-US: Progress bar with success segment
---

## zh-CN

标准的进度条。`type="circle|dashboard"` 时不支持分段颜色。

## en-US

A standard progress bar. Doesn't support trail color when `type="circle|dashboard"`.

```jsx
import { Tooltip, Progress } from 'antd';

ReactDOM.render(
  <>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} />
    </Tooltip>

    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} type="circle" />
    </Tooltip>

    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} type="dashboard" />
    </Tooltip>
  </>,
  mountNode,
);
```
