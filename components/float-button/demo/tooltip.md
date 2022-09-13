---
order: 2
iframe: 360
title:
  zh-CN: 含有气泡卡片的悬浮按钮
  en-US: Custom style
---

## zh-CN

含有气泡卡片的悬浮按钮

## en-US

You can customize the style of the button, just note the size limit: no more than `40px * 40px`.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton shape="square" tooltip="text" />;

export default App;
```
