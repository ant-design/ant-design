---
order: 2 
title: 
  zh-CN: 三种大小
  en-US: Three sizes
---

## zh-CN

三种大小的输入框，大的用在表单中，中的为默认。

## en-US

The input box comes in three sizes. large is used in the form, while the medium size is the default.

````jsx
import { TimePicker } from 'antd';

ReactDOM.render(
  <div>
    <TimePicker defaultValue="12:08:23" size="large" />
    <TimePicker defaultValue="12:08:23" />
    <TimePicker defaultValue="12:08:23" size="small" />
  </div>
, mountNode);
````
