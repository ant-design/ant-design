## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

```tsx
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';

const onChange = (time: Dayjs, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker format="kk:mm" onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);

export default App;
```
