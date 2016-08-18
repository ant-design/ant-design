---
order: 0
title: basic
---

Numeric-only input box.

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
, mountNode);
````
