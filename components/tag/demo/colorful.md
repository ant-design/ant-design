---
order: 1
title:
  zh-CN: 多彩标签
  en-US: Colorful
---

## zh-CN

基本标签可以通过 `color` 设置背景色，以提供视觉暗示区分不同目的的标签。

## en-US

We can set the background color of basic Tag by `color`, and it's helpful to tell different Tags.

````jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag color="#f50">#f50</Tag>
    <Tag color="#87d068">#87d068</Tag>
    <Tag color="#2db7f5">#2db7f5</Tag>
  </div>,
  mountNode
);
````
