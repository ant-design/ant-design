---
order: 1
iframe: 360
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

可以自定义悬浮按钮的样式。

## en-US

You can customize the style of the button, just note the size limit: no more than `40px * 40px`.

> Note: `FloatButton` expects a element could accept `onClick` propety as children. If you put a text directly as children the component will not function properly.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton type="primary" shape="square" />;

export default App;
```
