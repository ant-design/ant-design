---
order: 2
title:
  zh-CN: Warning
  en-US: Warning
---

## zh-CN

警告类型的结果。

## en-US

The result of the warning.

```tsx
import { Button, Result } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Result
    status="warning"
    title="There are some problems with your operation."
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />
);

export default App;
```
