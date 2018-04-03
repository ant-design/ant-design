---
order: 2
title:
  zh-CN: 标题位置
  en-US: Orientation of title
---

## zh-CN

修改分割线标题的位置。

## en-US

Set orientation of divider to left or right.

````jsx
import { Divider } from 'antd';

ReactDOM.render(
  <div>
    <Divider orientation="left">Left Text</Divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider orientation="right">Right Text</Divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
  </div>
, mountNode);
````
