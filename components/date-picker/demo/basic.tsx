import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const LuxonDatePicker = DatePicker.generatePicker(luxonGenerateConfig);

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
    <LuxonDatePicker
      showTime={{ format: 't' }}
      showNow={false}
      format="ff"
      use12Hours={true}
      showSecond={false}
      showHour={true}
      showMinute={true}
      needConfirm={false}
      inputReadOnly
    />
  </Space>
);

export default App;
