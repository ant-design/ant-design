---
order: 7
iframe: 360
title:
  zh-CN: 回到顶部
  en-US: Custom style
---

## zh-CN

我们已将 `antd@4.x` 中的 BackTop 组件废弃，在 `antd@5.0.0` 中，BackTop 集成在悬浮按钮中，你可以通过 `<FloatButton.BackTop />` 使用它

## en-US

We have deprecated the BackTop component in `antd@4.x`, In `antd@5.0.0`, BackTop is integrated in the FloatButton, which you can use by using `<FloatButton.backtop />`.

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
