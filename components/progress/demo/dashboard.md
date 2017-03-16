---
order: 8
title:
  zh-CN: 仪表盘
  en-US: Dashboard
---

## zh-CN

仪表盘。

## en-US

A dashboard.

````jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress type="dashboard" percent={75} />
  </div>
, mountNode);
````

<style>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
