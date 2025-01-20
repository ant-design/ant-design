import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Space, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <TimePicker
      suffixIcon={<SmileOutlined />}
      onChange={onChange}
      defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
    />
    <TimePicker prefix={<SmileOutlined />} />
    <TimePicker.RangePicker prefix={<SmileOutlined />} />
  </Space>
);

export default App;
