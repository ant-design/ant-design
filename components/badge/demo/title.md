---
order: 7
title:
  zh-CN: Title
  en-US: Title
---

## zh-CN

## en-US

The badge will display `title` when hovered over, instead of `count`.

````jsx
import { Badge } from 'antd';

ReactDOM.render(
  <div>
    <Badge count={5} title="Custom hover text">
      <a href="#" className="head-example" />
    </Badge>
  </div>
, mountNode);
````

<style>
.ant-badge:not(.ant-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}
</style>
