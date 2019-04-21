---
order: 0
title:
  zh-CN: 水平分割线
  en-US: Horizontal
---

## zh-CN

默认为水平分割线，可在中间加入文字。

## en-US

Divider is `horizontal` by default. You can add text within Divider.

````jsx
import { Divider } from 'antd';

ReactDOM.render(
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider>With Text</Divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider dashed />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
  </div>,
  mountNode
);
````
