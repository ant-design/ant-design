---
order: 4
title:
  zh-CN: 选择时分
  en-US: Hour and minute
---

## zh-CN

TimePicker 浮层中的列会随着 `format` 变化，当略去 `format` 中的某部分时，浮层中对应的列也会消失。

## en-US

While part of `format` is omitted, the corresponding column in panel will disappear, too.

```tsx
import { TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';

const format = 'HH:mm';

const App: React.FC = () => <TimePicker defaultValue={moment('12:08', format)} format={format} />;

export default App;
```
