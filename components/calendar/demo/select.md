---
order: 3
title:
  zh-CN: 选择功能
  en-US: Selectable Calendar
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

```jsx
import React, { useState } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

export default () => {
  const [calendar, setCalendar] = useState({
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  });

  const onSelect = value => {
    setCalendar({
      value,
      selectedValue: value,
    });
  };

  const onPanelChange = value => {
    setCalendar({
      ...calendar,
      value,
    });
  };

  return (
    <>
      <Alert
        message={`You selected date: ${
          calendar.selectedValue && calendar.selectedValue.format('YYYY-MM-DD')
        }`}
      />
      <Calendar value={calendar.value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};
```
