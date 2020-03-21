---
order: 23
title:
  zh-CN: 无边框
  en-US: Bordered-less
---

## zh-CN

无边框样式。

## en-US

Bordered-less style component.

```jsx
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

ReactDOM.render(
  <div>
    <DatePicker bordered={false} />
    <br />
    <DatePicker picker="week" bordered={false} />
    <br />
    <DatePicker picker="month" bordered={false} />
    <br />
    <DatePicker picker="year" bordered={false} />
    <br />
    <RangePicker bordered={false} />
    <br />
    <RangePicker picker="week" bordered={false} />
    <br />
    <RangePicker picker="month" bordered={false} />
    <br />
    <RangePicker picker="year" bordered={false} />
  </div>,
  mountNode,
);
```
