---
order: 1
title: Three sizes
---

There are three sizes of digit input box. When the size is `large` or `small`, the height is `32px` or `22px`, besides, `28px` is the default.


````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <div>
    <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
  </div>
, mountNode);
````

````css
.ant-input-number {
  margin-right: 10px;
}
````
