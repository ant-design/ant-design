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

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <DatePicker onChange={onChange} />
    <br />
    <DatePicker onChange={onChange} picker="week" />
    <br />
    <DatePicker onChange={onChange} picker="month" />
    <br />
    <DatePicker onChange={onChange} picker="year" />
  </div>,
  mountNode,
);
```
