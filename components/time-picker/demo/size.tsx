import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const App: React.FC = () => (
  <>
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="small" />
  </>
);

export default App;
