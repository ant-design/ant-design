---
order: 6
iframe: 360
title:
  zh-CN: 含有气泡卡片的悬浮按钮
  en-US: Custom style
---

## zh-CN

含有气泡卡片的悬浮按钮

## en-US

You can customize the style of the button.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton tooltip={<div>text</div>} />;

export default App;
```
