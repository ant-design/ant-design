---
order: 7
title:
  zh-CN: 预设状态的标签
  en-US: Status Tag
---

## zh-CN

预设五种状态颜色，可以通过设置 `color` 为`success`、 `processing`、`error`、`default`、`warning`来代表不同的状态。

## en-US

We preset five different colors, you can set color property such as `success`,`processing`,`error`,`default` and `warning` to indicate specific status.

```jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag color="success">成功</Tag>
    <Tag color="processing">进行中</Tag>
    <Tag color="error">失败</Tag>
    <Tag color="default">未开始</Tag>
    <Tag color="warning">警告</Tag>
  </div>,
  mountNode,
);
```
