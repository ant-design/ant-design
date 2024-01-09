import React from 'react';
// import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

// import type { Dayjs } from 'dayjs';

type TakeProps<T> = T extends React.ComponentType<infer P> ? P : never;
type TakeDatePickerProps = TakeProps<typeof DatePicker>;
type TakeOnChange = TakeDatePickerProps['onChange'];

const onChange: TakeOnChange = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker multiple onChange={onChange} />
    <DatePicker multiple onChange={onChange} picker="week" />
    <DatePicker multiple onChange={onChange} picker="month" />
    <DatePicker multiple onChange={onChange} picker="quarter" />
    <DatePicker multiple onChange={onChange} picker="year" />
  </Space>
);

export default App;
