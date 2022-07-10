---
order: 99
debug: true
title:
  zh-CN: Badge style
  en-US: 测试 Badge 的样式
---

## zh-CN

测试 Badge 的样式。

## en-US

Test Badge style.

```tsx
import { Badge, Radio } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Radio.Group buttonStyle="solid">
    <Badge count={1}>
      <Radio.Button value={1}>Click Me</Radio.Button>
    </Badge>
    <Badge count={2}>
      <Radio.Button value={2}>Not Me</Radio.Button>
    </Badge>
  </Radio.Group>
);

export default App;
```
