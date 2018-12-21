---
order: 1
title:
  zh-CN: 国际化
  en-US: Locale text
---

## zh-CN

使用 `okText` 和 `cancelText` 自定义按钮文字。

## en-US

Set `okText` and `cancelText` props to customize the button's labels.

````jsx
import { Popconfirm } from 'antd';

ReactDOM.render(
  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>,
  mountNode
);
````
