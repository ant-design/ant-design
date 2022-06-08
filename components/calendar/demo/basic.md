---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

```tsx
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import React from 'react';

const App: React.FC = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};

export default App;
```
