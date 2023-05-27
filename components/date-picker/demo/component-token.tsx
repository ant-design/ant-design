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
          basicCellHoverWithRangeColor: 'red',
          dateHoverRangeBorderColor: 'green',
          timePanelColumnWidth: 80,
          timePanelColumnHeight: 250,
          timePanelCellHeight: 30,
          panelCellWidth: 28,
          panelCellHeight: 40,
          textHeight: 45,
          panelWithoutTimeCellHeight: 70,
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
