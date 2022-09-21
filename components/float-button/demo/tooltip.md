---
order: 2
iframe: 360
title:
  zh-CN: 含有气泡卡片的悬浮按钮
  en-US: button with tooltip
---

## zh-CN

设置 tooltip 属性，即可开启气泡卡片

## en-US

Setting the `tooltip` can open the tooltip.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton tooltip={<div>帮助文档</div>} />;

export default App;
```
