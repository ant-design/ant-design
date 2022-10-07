import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import React from 'react';

const { RangePicker } = DatePicker;

const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <RangePicker
      ranges={{
        Today: [dayjs(), dayjs()],
        'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
      }}
      onChange={onChange}
    />
    <RangePicker
      ranges={{
        Today: [dayjs(), dayjs()],
        'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
      }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  </Space>
);

export default App;
