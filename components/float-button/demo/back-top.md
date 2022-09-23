---
order: 7
iframe: 360
title:
  zh-CN: 回到顶部
  en-US: BackTop
---

## zh-CN

返回页面顶部的操作按钮。

## en-US

`BackTop` makes it easy to go back to the top of the page.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div style={{ height: '500vh', padding: 10 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop />
  </div>
);

export default App;
```
