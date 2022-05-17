---
order: 1
title:
  zh-CN: 受控组件
  en-US: Under Control
---

## zh-CN

value 和 onChange 需要配合使用。

## en-US

`value` and `onChange` should be used together,

```tsx
import React, { useState } from 'react';
import { TimePicker } from 'antd';
import type { Moment } from 'moment';

const App: React.FC = () => {
  const [value, setValue] = useState<Moment | null>(null);

  const onChange = (time: Moment) => {
    setValue(time);
  };

  return <TimePicker value={value} onChange={onChange} />;
};

export default App;
```
