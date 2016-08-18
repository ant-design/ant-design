---
order: 6
title:
  zh-CN: 指定不可选择日期
  en-US: Specify the date that cannot be selected
---

## zh-CN

设置 `disabledDate` 方法，来确定不可选时段。

如上例：不可选择今天之后的日期。

## en-US

Specify unselectable period by `disabledDate`.

As in the example above: you can't select a date later than today.

````jsx
import { DatePicker } from 'antd';

const disabledDate = function (current) {
  // can not select days after today
  return current && current.getTime() > Date.now();
};

ReactDOM.render(
  <DatePicker disabledDate={disabledDate} />
, mountNode);
````
