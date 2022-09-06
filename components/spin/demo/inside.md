---
order: 2
title:
  zh-CN: 容器
  en-US: Inside a container
---

## zh-CN

放入一个容器中。

## en-US

Spin in a container.

```tsx
import { Spin } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="example">
    <Spin />
  </div>
);

export default App;
```

```css
.example {
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
```

<style>
  .example {
    background: rgba(255,255,255,0.08);
  }
</style>
