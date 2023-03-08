import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12} style={{ marginLeft: 500 }}>
    {/* <RangePicker /> */}
    <RangePicker showTime open />
    {/* <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker picker="year" /> */}
  </Space>
);

export default App;
