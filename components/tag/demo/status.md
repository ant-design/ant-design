---
order: 7
title:
  zh-CN: 预设状态的标签
  en-US: Status Tag
---

## zh-CN

预设五种状态颜色，可以通过设置 `color` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。

## en-US

We preset five different colors, you can set color property such as `success`,`processing`,`error`,`default` and `warning` to indicate specific status.

```jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag color="success">success</Tag>
    <Tag color="processing">processing</Tag>
    <Tag color="error">error</Tag>
    <Tag color="default">default</Tag>
    <Tag color="warning">warning</Tag>
  </div>,
  mountNode,
);
```
