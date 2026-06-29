import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm:ss';

const App: React.FC = () => {
  const startTime = dayjs('12:08:23', 'HH:mm:ss');
  const endTime = dayjs('12:08:23', 'HH:mm:ss');

  return <TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} />;
};

export default App;
