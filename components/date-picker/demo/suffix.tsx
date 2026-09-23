import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

const onChange = (date: Dayjs | (Dayjs | null)[] | null, dateString: string | string[] | null) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker suffix={smileIcon} onChange={onChange} />
    <DatePicker suffix={smileIcon} onChange={onChange} picker="month" />
    <RangePicker suffix={smileIcon} onChange={onChange} />
    <DatePicker suffix={smileIcon} onChange={onChange} picker="week" />
    <DatePicker suffix="ab" onChange={onChange} />
    <DatePicker suffix="ab" onChange={onChange} picker="month" />
    <RangePicker suffix="ab" onChange={onChange} />
    <DatePicker suffix="ab" onChange={onChange} picker="week" />
    <DatePicker prefix={smileIcon} onChange={onChange} picker="week" />
    <DatePicker prefix="Event Period" onChange={onChange} picker="week" />
    <RangePicker prefix={smileIcon} onChange={onChange} picker="week" />
    <RangePicker prefix="Event Period" onChange={onChange} picker="week" />
  </Space>
);

export default App;
