---
order: 1
title:
  zh-CN: Info
  en-US: Info
---

## zh-CN

展示处理结果。

## en-US

Show processing results.

```tsx
import { Button, Result } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Result
    title="Your operation has been executed"
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />
);

export default App;
```
