---
order: 3
title:
  zh-CN: 禁用
  en-US: disabled
---

## zh-CN

禁用时间选择。

## en-US

A disabled state of the `TimePicker`.

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const App: React.FC = () => <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} disabled />;

export default App;
```
