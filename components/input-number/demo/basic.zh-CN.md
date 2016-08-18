---
order: 0
title: 基本
---

数字输入框。

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
, mountNode);
````
