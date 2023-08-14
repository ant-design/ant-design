import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { DatePicker, Space } from 'antd';

const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

type DatePickerValue = Dayjs | null;
type RangePickerValue = [Dayjs | null, Dayjs | null] | null;

const onChange = (
  date: DatePickerValue | RangePickerValue,
  dateString: [string, string] | string,
) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
  </Space>
);

export default App;
