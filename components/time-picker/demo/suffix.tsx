import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

dayjs.extend(customParseFormat);

const onChange = (time: Dayjs, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker
    suffixIcon={<SmileOutlined />}
    onChange={onChange}
    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
  />
);

export default App;
