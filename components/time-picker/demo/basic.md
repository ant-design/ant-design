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
import { TimePicker } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

ReactDOM.render(
  <TimePicker onChange={onChange} />
, mountNode);
````
