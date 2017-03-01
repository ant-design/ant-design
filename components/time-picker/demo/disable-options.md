---
order: 5
title:
  zh-CN: 禁止选项
  en-US: Disabled Time
---
## zh-CN

可以使用 `disabledHours` `disabledMinutes` `disabledSeconds` 组合禁止用户选择某个时间，配合 `hideDisabledOptions` 可以直接把不可选择的项隐藏。

## en-US

Make part of time unselectable by `disabledHours` `disabledMinutes` `disabledSeconds`, and we even can hide those unselectable options by `hideDisabledOptions`.

````jsx
import { TimePicker } from 'antd';

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledHours() {
  const hours = range(0, 60);
  hours.splice(20, 4);
  return hours;
}

function disabledMinutes(h) {
  if (h === 20) {
    return range(0, 31);
  } else if (h === 23) {
    return range(30, 60);
  }
  return [];
}

ReactDOM.render(
  <div>
    <TimePicker
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      placeholder="Just Disabled"
    />
    <TimePicker
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      hideDisabledOptions
      placeholder="Hide Directly"
    />
  </div>
, mountNode);
````

<style>
#components-time-picker-demo-disable-options .ant-time-picker {
  width: 120px;
}
</style>
