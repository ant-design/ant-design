import React from 'react';
import { ConfigProvider, DatePicker, Divider, Flex, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';

/** Test usage. Do not use in your production. */

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <>
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
        />
        <RangePicker />
        <TimePicker />
        <DatePicker picker="month" />
      </Space>
    </ConfigProvider>

    <Divider />

    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            controlHeightSM: 32,
            controlHeight: 40,
          },
        },
      }}
    >
      <Flex vertical gap={8}>
        <DatePicker multiple size="small" />
        <DatePicker multiple />
        <DatePicker multiple size="large" />
      </Flex>
    </ConfigProvider>
  </>
);

export default App;
