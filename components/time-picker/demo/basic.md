---
order: 0
title: 基本
---

最简单的用法。

````jsx
import { TimePicker } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

ReactDOM.render(
  <TimePicker onChange={onChange} />
, mountNode);
````
