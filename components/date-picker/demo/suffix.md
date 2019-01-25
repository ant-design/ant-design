---
order: 13
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

最简单的用法，在浮层中可以选择或者输入日期。

## en-US

Basic use case. Users can select or input a date in panel.

````jsx
import { DatePicker, Icon } from 'antd';

const smileIcon = <Icon type="smile" />;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <MonthPicker suffixIcon={smileIcon} onChange={onChange} placeholder="Select month" />
    <br />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <WeekPicker suffixIcon={smileIcon} onChange={onChange} placeholder="Select week" />
    <br />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <MonthPicker suffixIcon="ab" onChange={onChange} placeholder="Select month" />
    <br />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <WeekPicker suffixIcon="ab" onChange={onChange} placeholder="Select week" />
  </div>,
  mountNode
);
````
