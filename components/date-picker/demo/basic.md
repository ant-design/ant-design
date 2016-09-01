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
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(<DatePicker onChange={onChange} />, mountNode);
````
