---
order: 1
iframe: 360
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

你可以自定义悬浮按钮的样式。

## en-US

You can customize the style of the FloatButton.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton style={{ right: 24 }} />
    <FloatButton style={{ right: 80 }} shape="square" />
    <FloatButton style={{ right: 136 }} type="primary" />
    <FloatButton style={{ right: 192 }} shape="square" type="primary" />
  </>
);

export default App;
```
