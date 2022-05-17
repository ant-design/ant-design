---
order: 99
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import { SmileOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';

const onChange = (time: Moment, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker
    suffixIcon={<SmileOutlined />}
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />
);

export default App;
```
