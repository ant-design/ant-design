---
order: 99
title:
  zh-CN: 受控同步模式
  en-US: Controlled Synced mode
debug: true
---

## zh-CN

测试受控模式下两个 Segmented 同步 state。

## en-US

Tests two Segmented synchronized states in controlled mode.

```jsx
import { useState } from 'react';
import { Segmented } from 'antd';

const Demo = () => {
  const [foo, setFoo] = useState('AND');
  return (
    <>
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={setFoo} />
      &nbsp;&nbsp;
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={value => setFoo(value)} />
    </>
  );
};

export default Demo;
```
