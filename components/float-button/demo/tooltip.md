---
order: 4
title:
  zh-CN: 含有气泡卡片的悬浮按钮
  en-US: FloatButton with tooltip
---

## zh-CN

设置 tooltip 属性，即可开启气泡卡片

## en-US

Setting `tooltip` prop to show FloatButton with tooltip.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div>
    <span>查看右下角的 FloatButton</span>
    <FloatButton tooltip={<div>帮助文档</div>} />
  </div>
);

export default App;
```
