---
order: 7
title:
  zh-CN: 状态Tag
  en-US: Status Tag
---

## zh-CN

可以通过添加 `status` 变为状态标签。

## en-US

Usage of status Tag, and it could be status tag by set `status` property.

```jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag status="success">成功</Tag>
    <Tag status="processing">进行中</Tag>
    <Tag status="error">失败</Tag>
    <Tag status="default">未开始</Tag>
    <Tag status="warning">警告</Tag>
  </div>,
  mountNode,
);
```
