---
order: 4
title:
  zh-CN: 分隔符
  en-US: Configuring the Separator
---

## zh-CN

使用 `separator=">"` 可以自定义分隔符。

## en-US

The separator can be customized by setting the separator property: separator=">".

```jsx
import { Breadcrumb } from 'antd';

ReactDOM.render(
  <Breadcrumb separator=">">
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>,
  mountNode,
);
```
