---
order: 6
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
    <Badge status="success" />
    <Badge status="error" />
    <Badge status="default" />
    <Badge status="processing" />
    <Badge status="warning" />
    <br />
    <Badge status="success" text="Success" />
    <br />
    <Badge status="error" text="Error" />
    <br />
    <Badge status="default" text="Default" />
    <br />
    <Badge status="processing" text="Processing" />
    <br />
    <Badge status="warning" text="Warning" />
  </div>,
  mountNode
);
````
