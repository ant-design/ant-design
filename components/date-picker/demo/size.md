---
order: 1
title: 
  zh-CN: 三种大小
  en-US: Three sizes
---

## zh-CN

三种大小的输入框，大的用在表单中，中的为默认。

## en-US

The input box comes in three sizes. `large` is used in the form, while the medium size is the default.


````jsx
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <div>
    <DatePicker size="large" />
    <DatePicker />
    <DatePicker size="small" />
  </div>
, mountNode);
````
