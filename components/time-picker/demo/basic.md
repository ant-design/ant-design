---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

````jsx
import { TimePicker } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

ReactDOM.render(<TimePicker onChange={onChange} />, mountNode);
````
