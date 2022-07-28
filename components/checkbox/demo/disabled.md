---
order: 1
title:
  zh-CN: 不可用
  en-US: Disabled
---

## zh-CN

checkbox 不可用。

## en-US

Disabled checkbox.

```tsx
import { Checkbox } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Checkbox defaultChecked={false} disabled />
    <br />
    <Checkbox defaultChecked disabled />
  </>
);

export default App;
```
