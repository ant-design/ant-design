---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```tsx
import { FloatButton } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <FloatButton />
    Scroll down to see the bottom-right
  </>
);

export default App;
```

```css
.site-back-top-basic {
  color: rgba(64, 64, 64, 0.6);
}
```

<style>
[data-theme="dark"] .site-back-top-basic {
  color: rgba(255,255,255,.45);
}
</style>
