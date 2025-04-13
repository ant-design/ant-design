import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker variant="filled" defaultValue={dayjs('2015-06-06', dateFormat)} disabled />
    <DatePicker
      variant="filled"
      picker="month"
      defaultValue={dayjs('2015-06', 'YYYY-MM')}
      disabled
    />
    <RangePicker
      variant="filled"
      defaultValue={[dayjs('2015-06-06', dateFormat), dayjs('2015-06-06', dateFormat)]}
      disabled
    />
    <RangePicker
      variant="filled"
      defaultValue={[dayjs('2019-09-03', dateFormat), dayjs('2019-11-22', dateFormat)]}
      disabled={[false, true]}
    />
    <DatePicker
      defaultValue={dayjs('2023-12-25')}
      variant="filled"
      status="error"
      style={{ width: '100%' }}
    />
    <DatePicker variant="filled" status="warning" style={{ width: '100%' }} />
    <RangePicker variant="filled" status="error" style={{ width: '100%' }} />
    <RangePicker variant="filled" status="warning" style={{ width: '100%' }} />
  </Space>
);

export default App;
