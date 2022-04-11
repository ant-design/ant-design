---
order: 0
title:
  zh-CN: 受控模式
  en-US: Controlled mode
---

## zh-CN

受控的 Segmented。

## en-US

Controlled Segmented.

```jsx
import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState('Map');

  return (
    <Segmented
      options={['Map', 'Transit', 'Satellite']}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```
