---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的徽章展示。

## en-US

Simplest Usage.

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <Badge count={5}>
    <a href="#" className="head-example" />
  </Badge>
, mountNode);
````

````css
.ant-badge {
  margin-right: 16px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: #eee;
  display: inline-block;
}
````
