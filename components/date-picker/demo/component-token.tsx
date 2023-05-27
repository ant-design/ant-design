import type { DatePickerProps } from 'antd';
import { DatePicker, TimePicker, Space, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

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
          pickerBasicCellHoverWithRangeColor: 'red',
          pickerDateHoverRangeBorderColor: 'green',
          pickerTimePanelColumnWidth: 80,
          pickerTimePanelColumnHeight: 250,
          pickerTimePanelCellHeight: 30,
          pickerPanelCellWidth: 28,
          pickerPanelCellHeight: 40,
          pickerTextHeight: 45,
          pickerPanelWithoutTimeCellHeight: 70,
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
