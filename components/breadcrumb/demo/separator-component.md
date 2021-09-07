---
order: 6
title:
  zh-CN: 分隔符
  en-US: Configuring the Separator
---

## zh-CN

使用 `Breadcrumb.Separator` 可以自定义分隔符。

## en-US

The separator can be customized by setting the separator property: `Breadcrumb.Separator`.

```jsx
import { Breadcrumb } from 'antd';

ReactDOM.render(
  <Breadcrumb separator="">
    <Breadcrumb.Item>Location</Breadcrumb.Item>
    <Breadcrumb.Separator>:</Breadcrumb.Separator>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>,
  mountNode,
);
```
