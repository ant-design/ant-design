---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

```tsx
import { TimePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React from 'react';

const onChange = (time: Moment, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
);

export default App;
```
