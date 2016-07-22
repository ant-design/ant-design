---
order: 3
title: 小数
---

和原生的数字输入框一样，value 的精度由 step 的小数位数决定。

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber min={1} max={10} step={0.1} onChange={onChange} />
, mountNode);
````
