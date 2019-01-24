---
order: 9
title:
  zh-CN: 分段进度条
  en-US: Progress bar with success segment
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

````jsx
import { Tooltip, Progress } from 'antd';

ReactDOM.render(
  <div>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} successPercent={30} />
    </Tooltip>

    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} successPercent={30} type="circle" />
    </Tooltip>

    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} successPercent={30} type="dashboard" />
    </Tooltip>
  </div>,
  mountNode
);
````
