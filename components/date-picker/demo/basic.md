---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

````jsx
import { DatePicker } from 'antd';

function onChange(value, dateString) {
  console.log(value, dateString);
}

ReactDOM.render(<DatePicker onChange={onChange} />, mountNode);
````
