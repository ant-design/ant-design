---
order: 24
title:
  zh-CN: 快速选择日期
  en-US: Select Date Quickly
---

## zh-CN

选择日期快捷方式。

## en-US

Select Date Quickly.

```jsx
import { DatePicker, Space } from 'antd';

const { QuickPicker } = DatePicker;
function onChange(t) {
  window.t = t;
  console.log('changed::', t);
}
ReactDOM.render(
  <Space direction="vertical" size={12}>
    <QuickPicker onChange={onChange} />
  </Space>,
  mountNode,
);
```
