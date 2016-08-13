---
order: 3
title: decimals
---

The same with the native digit input box, the value's accuracy is determined by the number of decimal places.

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={1} max={10} step={0.1} onChange={onChange} />
, mountNode);
````
