import React from 'react';
import type { DatePickerProps } from 'antd';
import { ConfigProvider, DatePicker, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';

/** Test usage. Do not use in your production. */

const { RangePicker } = DatePicker;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        DatePicker: {
          presetsWidth: 160,
          zIndexPopup: 888,
          cellHoverWithRangeBg: '#f0f0f0',
          cellActiveWithRangeBg: '#e6bbff',
          cellRangeBorderColor: 'green',
          timeColumnWidth: 80,
          timeColumnHeight: 250,
          timeCellHeight: 30,
          cellWidth: 64,
          cellHeight: 40,
          textHeight: 45,
          withoutTimeCellHeight: 70,
        },
      },
    }}
  >
    <Space direction="vertical">
      <DatePicker
        presets={[
          { label: 'Yesterday', value: dayjs().add(-1, 'd') },
          { label: 'Last Week', value: dayjs().add(-7, 'd') },
          { label: 'Last Month', value: dayjs().add(-1, 'month') },
        ]}
        onChange={onChange}
      />
      <RangePicker />
      <TimePicker onChange={onChange} />
      <DatePicker onChange={onChange} picker="month" />
    </Space>
  </ConfigProvider>
);

export default App;
