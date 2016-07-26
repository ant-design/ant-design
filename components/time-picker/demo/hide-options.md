---
order: 6
title: 
  zh-CN: 只显示部分选项
  en-US: Show part of options.
---

## zh-CN

通过 hideDisabledOptions 将不可选的选项隐藏。

## en-US

use `hideDisabledOptions` to hide the disabled options.

````jsx
import { TimePicker } from 'antd';

function newArray(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledMinutes() {
  return newArray(0, 60).filter(value => value % 10 !== 0);
}

function disabledSeconds() {
  return newArray(0, 60).filter(value => value % 30 !== 0);
}

ReactDOM.render(
  <TimePicker disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} hideDisabledOptions />
, mountNode);
````
