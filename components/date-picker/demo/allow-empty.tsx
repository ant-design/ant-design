import React from 'react';
import { DatePicker } from 'antd';

const App: React.FC = () => (
  <DatePicker.RangePicker
    placeholder={['Allow Empty', 'Till Now']}
    allowEmpty={[false, true]}
    onChange={(date, dateString) => {
      console.log(date, dateString);
    }}
  />
);

export default App;
