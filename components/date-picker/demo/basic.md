---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法，在浮层中可以选择或者输入日期。

## en-US

Basic use case. Users can select or input a date in panel.

```jsx
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <DatePicker onChange={onChange} />
    <br />
    <DatePicker onChange={onChange} picker="week" placeholder="Select week" />
    <br />
    <DatePicker onChange={onChange} picker="month" placeholder="Select month" />
    <br />
    <DatePicker onChange={onChange} picker="year" placeholder="Select year" />
    <br />
    <RangePicker onChange={onChange} />
  </div>,
  mountNode,
);
```
