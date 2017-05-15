---
order: 8
title:
  zh-CN: 预设范围
  en-US: Presetted Ranges
---

## zh-CN

RangePicker 可以设置常用的 预设范围 提高用户体验。

## en-US

We can set presetted ranges to RangePicker to improve user experience.

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
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      onChange={onChange}
    />
    <br />
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  </div>,
  mountNode
);
````
