import React from 'react';
import type { Dayjs } from 'dayjs';
import { Space, TimePicker } from 'antd';

const onChange = (time: Dayjs, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space wrap>
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
    <TimePicker use12Hours format="h:mm a" onChange={onChange} />
  </Space>
);

export default App;
