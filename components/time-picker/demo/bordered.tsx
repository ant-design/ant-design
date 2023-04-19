import React from 'react';
import { TimePicker } from 'antd';

const { RangePicker } = TimePicker;

const App = () => (
  <>
    <TimePicker bordered={false} />
    <RangePicker bordered={false} />
  </>
);

export default App;
