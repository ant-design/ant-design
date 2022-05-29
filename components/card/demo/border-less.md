---
order: 1
title:
  zh-CN: 无边框
  en-US: No border
---

## zh-CN

在灰色背景上使用无边框的卡片。

## en-US

A borderless card on a gray background.

```tsx
import { Card } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="site-card-border-less-wrapper">
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
);

export default App;
```

```css
.site-card-border-less-wrapper {
  padding: 30px;
  background: #ececec;
}
```

<style>
  [data-theme="dark"] .site-card-border-less-wrapper {
    background: #303030;
  }
</style>
