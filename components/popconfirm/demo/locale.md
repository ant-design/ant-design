---
order: 2
title: 
  zh-CN:国际化
  en-US:Internationalization
---

## zh-CN

设置 `okText` `cancelText` 以自定义按钮文字。

## en-US

Set `okText` `cancelText` to the costom button text.

````jsx
import { Popconfirm } from 'antd';

ReactDOM.render(
  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>
, mountNode);
````
