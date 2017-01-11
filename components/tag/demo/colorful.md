---
order: 2
title:
  zh-CN: 自定义色彩
  en-US: Custom Color
---

## zh-CN

如果预设值不能满足你的需求，可以用 `color` 属性定制你需要的色彩。

## en-US

Use `color` property to set tag's color which is not included in preset colors.

````jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag color="#f50">#f50</Tag>
    <Tag color="#2db7f5">#2db7f5</Tag>
    <Tag color="#87d068">#87d068</Tag>
    <Tag color="#108ee9">#108ee9</Tag>
  </div>,
  mountNode
);
````
