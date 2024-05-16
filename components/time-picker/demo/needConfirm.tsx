import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker, Space } from 'antd';

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <TimePicker onChange={onChange} needConfirm />
    <TimePicker onChange={onChange} needConfirm={false} />
  </Space>
);

export default App;
