---
order: 99
title:
  zh-CN: 自定义日期范围选择
  en-US: Customized Range Picker
debug: true
---

## zh-CN

当 `RangePicker` 无法满足业务需求时，可以使用两个 `DatePicker` 实现类似的功能。

> - 通过设置 `disabledDate` 方法，来约束开始和结束日期。
> - 通过 `open` `onOpenChange` 来优化交互。

## en-US

When `RangePicker` does not satisfied your requirements, try to implement similar functionality with two `DatePicker`.

> - Use the `disabledDate` property to limit the start and end dates.
> - Improve user experience with `open` and `onOpenChange`.

```tsx
import { DatePicker, Space } from 'antd';
import type { Moment } from 'moment';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [startValue, setStartValue] = useState<Moment | null>(null);
  const [endValue, setEndValue] = useState<Moment | null>(null);
  const [endOpen, setEndOpen] = useState(false);

  const disabledStartDate = (startDate: Moment) => {
    if (!startDate || !endValue) {
      return false;
    }
    return startDate.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = (endDate: Moment) => {
    if (!endDate || !startValue) {
      return false;
    }
    return endDate.valueOf() <= startValue.valueOf();
  };

  const handleStartOpenChange = (open: boolean) => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = (open: boolean) => {
    setEndOpen(open);
  };

  return (
    <Space>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startValue}
        placeholder="Start"
        onChange={setStartValue}
        onOpenChange={handleStartOpenChange}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="End"
        onChange={setEndValue}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </Space>
  );
};

export default App;
```
