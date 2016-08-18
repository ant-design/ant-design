---
order: 1
title: Three sizes
---

There are three sizes available to a numeric input box. By default, the size is `28px`. The two additional sizes are `large` and `small` which means `32px` and `22px`, respectively.


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
