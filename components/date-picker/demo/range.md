---
order: 8
title:
  zh-CN: 日期范围二
  en-US: Date range, case 2
---

## zh-CN

使用 `RangePicker` 实现日期范围选择有更好的交互体验。

## en-US

By using `RangePicker` to specify a date range, you can achieve a better interactive experience.



````jsx
import { DatePicker } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}
ReactDOM.render(
  <div>
    <RangePicker style={{ width: 200 }} onChange={onChange} />
    <br />
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      style={{ width: 200 }} onChange={onChange}
    />
    <br />
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      showTime format="YYYY/MM/DD HH:mm:ss" onChange={onChange}
    />
    <br />
    <RangePicker showTime format="YYYY/MM/DD HH:mm:ss" onChange={onChange} />
  </div>,
  mountNode
);
````
