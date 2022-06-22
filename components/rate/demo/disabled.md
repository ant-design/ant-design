---
order: 3
title:
  zh-CN: 只读
  en-US: Read only
---

## zh-CN

只读，无法进行鼠标交互。

## en-US

Read only, can't use mouse to interact.

```tsx
import { Rate } from 'antd';
import React from 'react';

const App: React.FC = () => <Rate disabled defaultValue={2} />;

export default App;
```
