import React from 'react';
import { DatePicker } from 'antd';

const App: React.FC = () => (
  <DatePicker.RangePicker
    placeholder={['Start Date', 'Till Now']}
    allowEmpty={[true, false]}
    onChange={(date, dateString) => {
      console.log(date, dateString);
    }}
  />
);

export default App;
