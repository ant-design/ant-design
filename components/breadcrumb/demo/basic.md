---
order: 0
title: 基本
---

最简单的用法。

````jsx
import { Breadcrumb } from 'antd';

ReactDOM.render(
  <Breadcrumb>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item><a href="">应用中心</a></Breadcrumb.Item>
    <Breadcrumb.Item><a href="">应用列表</a></Breadcrumb.Item>
    <Breadcrumb.Item>某应用</Breadcrumb.Item>
  </Breadcrumb>
, mountNode);
````
