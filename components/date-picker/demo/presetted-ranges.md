---
order: 8
title:
  zh-CN: 预设范围
  en-US: Preset Ranges
only: true
---

## zh-CN

可以预设常用的日期范围以提高用户体验。

## en-US

We can set preset ranges to RangePicker to improve user experience.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const onChange = (date: Dayjs) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};
const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      presets={[
        { label: 'Today', value: dayjs() },
        { label: 'Yesterday', value: dayjs().add(-1, 'd') },
        { label: 'Last Week', value: dayjs().add(-7, 'd') },
      ]}
      onChange={onChange}
    />
    <RangePicker
      presets={[
        { label: 'Today', value: [dayjs(), dayjs()] },
        { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
      ]}
      onChange={onRangeChange}
    />
    <RangePicker
      presets={[
        { label: 'Today', value: [dayjs(), dayjs()] },
        { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
      ]}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onRangeChange}
    />
  </Space>
);

export default App;
```
