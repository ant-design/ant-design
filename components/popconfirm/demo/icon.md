---
order: 4
title:
  zh-CN: 自定义 Icon 图标
  en-US: Customize icon
---

## zh-CN

使用 `icon` 自定义提示 `icon`。

## en-US

Set `icon` props to customize the icon.

````jsx
import { Popconfirm, Icon } from 'antd';

ReactDOM.render(
  <Popconfirm title="Are you sure？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
    <a href="#">Delete</a>
  </Popconfirm>,
  mountNode
);
````
