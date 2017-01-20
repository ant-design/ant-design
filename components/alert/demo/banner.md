---
order: 6
title:
  zh-CN: 顶部公告
  en-US: Banner
---

## zh-CN

用作顶部公告时，默认有图标，`type` 为 'warning'，并有特殊样式。

## en-US

When `Alert` is used as banner, it has particular style, Icon and `type`(warning) are specified by default.

````__react
import { Alert } from 'antd';

ReactDOM.render(
  <div>
    <Alert message="Warning text" banner />
    <br />
    <Alert message="Very long warning text warning text text text text text text text" banner closable />
  </div>
, mountNode);
````
