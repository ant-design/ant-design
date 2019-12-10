---
order: 99
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

最简单的用法，在浮层中可以选择或者输入日期。

## en-US

Basic use case. Users can select or input a date in panel.

```jsx
import { DatePicker } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
    <br />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
    <br />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
    <br />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
  </div>,
  mountNode,
);
```
