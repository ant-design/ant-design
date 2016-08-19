---
order: 7
title:
  zh-CN: 状态点
  en-US: Status
---

## zh-CN

用于表示状态的小圆点。

## en-US

Standalone badge with status.

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <label>Status: &nbsp;</label>
    <Badge dot status="success" />
    <Badge dot status="failed" />
    <Badge dot status="default" />
    <Badge dot status="processing" />
    <Badge dot status="exception" />
    <br />
    <Badge dot status="success" text="Success" /><br />
    <Badge dot status="failed" text="Failed" /><br />
    <Badge dot status="default" text="Default" /><br />
    <Badge dot status="processing" text="Processing" /><br />
    <Badge dot status="exception" text="Exception" />
  </div>,
  mountNode
);
````
