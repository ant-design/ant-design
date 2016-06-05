---
order: 1
title:
  zh-CN: 带有图标的
  en-US: With Icon
---

## zh-CN

图标放在文字前面。

## en-US

Icon should in the front of text.

````jsx
import { Breadcrumb, Icon } from 'antd';

ReactDOM.render(
  <Breadcrumb>
    <Breadcrumb.Item href="">
      <Icon type="home" />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <Icon type="user" />
      应用列表
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      应用
    </Breadcrumb.Item>
  </Breadcrumb>
, mountNode);
````

