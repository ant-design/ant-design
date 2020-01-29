---
order: 1
title:
  zh-CN: 各种大小
  en-US: Size
---

## zh-CN

小的用于文本加载，默认用于卡片容器级加载，大的用于**页面级**加载。

## en-US

A small `Spin` is used for loading text, default sized `Spin` for loading a card-level block, and large `Spin` used for loading a **page**.

```jsx
import { Spin } from 'antd';

ReactDOM.render(
  <div>
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </div>,
  mountNode,
);
```

<style>
.ant-spin {
  margin-right: 16px;
}
</style>
