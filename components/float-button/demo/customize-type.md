---
order: 1
iframe: 360
title:
  zh-CN: 类型
  en-US: type
---

## zh-CN

通过 `type` 改变悬浮按钮的类型

## en-US

Change the type of the FloatButton with `type`.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton type="primary" style={{ right: 24 }} />
    <FloatButton type="default" style={{ right: 94 }} />
  </>
);

export default App;
```
