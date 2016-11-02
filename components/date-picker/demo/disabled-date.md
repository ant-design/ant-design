---
order: 6
title:
  zh-CN: 指定不可选择日期
  en-US: Specify the date that cannot be selected
---

## zh-CN

设置 `disabledDate` 方法，来确定不可选时段。
设置 `disabledTime` 方法，来确定 showTime 的 RangePicker 的不可选时间段。

如上例：不可选择今天之后的日期。

## en-US

Specify unselectable period by `disabledDate`.

As in the example above: you can't select a date later than today.

````jsx
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}


const disabledDate = function (current) {
  // can not select days after today
  return current && current.valueOf() > Date.now();
};

function disabledTime(time, type) {
  console.log('disabledTime', time, type);
  if (type === 'start') {
    return {
      disabledHours() {
        return newArray(0, 60).splice(4, 20);
      },
      disabledMinutes() {
        return newArray(30, 60);
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  }
  return {
    disabledHours() {
      return newArray(0, 60).splice(20, 4);
    },
    disabledMinutes() {
      return newArray(0, 31);
    },
    disabledSeconds() {
      return [55, 56];
    },
  };
}

ReactDOM.render(<div>
    <DatePicker disabledDate={disabledDate} />
    <br />
    <RangePicker showTime disabledDate={disabledDate} disabledTime={disabledTime} />
  </div>
, mountNode);
````
