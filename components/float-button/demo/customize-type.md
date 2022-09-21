---
order: 1
iframe: 360
title:
  zh-CN: 自定义类型
  en-US: Custom type
---

## zh-CN

你可以定义悬浮按钮的类型

## en-US

You can customize the type of the FloatButton.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton type="primary" style={{ right: 24 }} />
    <FloatButton type="default" style={{ right: 80 }} />
  </>
);

export default App;
```
