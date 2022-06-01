---
order: 3
title:
  zh-CN: 不区分大小写
  en-US: Non-case-sensitive AutoComplete
---

## zh-CN

不区分大小写的 AutoComplete

## en-US

A non-case-sensitive AutoComplete

```tsx
import { AutoComplete } from 'antd';
import React from 'react';

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const App: React.FC = () => (
  <AutoComplete
    style={{ width: 200 }}
    options={options}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) =>
      option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);

export default App;
```
