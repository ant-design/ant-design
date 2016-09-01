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
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const RangePicker = DatePicker.RangePicker;

function onChange(value) {
  console.log('From: ', value[0], ', to: ', value[1]);
}
ReactDOM.render(<div>
  <RangePicker style={{ width: 184 }} onChange={onChange} />
  <br />
  <RangePicker showTime format="YYYY/MM/DD HH:mm:ss" onChange={onChange} />
</div>, mountNode);
````
