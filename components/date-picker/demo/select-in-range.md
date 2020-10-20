---
order: 6.1
title:
  zh-CN: 选择不超过七天的范围
  en-US: Select range dates in 7 days
---

## zh-CN

这里举例如何用 `onCalendarChange` 和 `disabledDate` 来限制动态的日期区间选择。

## en-US

A example shows how to select a dynamic range by using `onCalendarChange` and `disabledDate`.

```jsx
import React, { useState } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const App = () => {
  const [dates, setDates] = useState([]);
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return tooEarly || tooLate;
  };

  return (
    <RangePicker
      disabledDate={disabledDate}
      onCalendarChange={value => {
        const [start, end] = value;
        const [oldStart, oldEnd] = dates;
        setDates([start || oldStart, end || oldEnd]);
      }}
    />
  );
};

ReactDOM.render(<App />, mountNode);
```
