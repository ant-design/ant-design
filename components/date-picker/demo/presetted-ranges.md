---
order: 8
title:
  zh-CN: 预设范围
  en-US: Preset Ranges
---

## zh-CN

可以预设常用的日期范围以提高用户体验。

## en-US

We can set preset ranges to RangePicker to improve user experience.

```jsx
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

ReactDOM.render(
  <Space direction="vertical" size={12}>
    <RangePicker
      ranges={{
        Today: [dayjs(), dayjs()],
        'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
      }}
      onChange={onChange}
    />
    <RangePicker
      ranges={{
        Today: [dayjs(), dayjs()],
        'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
      }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  </Space>,
  mountNode,
);
```
