---
order: 0
title: 基本用法
---

简单的 checkbox。

````jsx
import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(
  <Checkbox onChange={onChange}>Checkbox</Checkbox>
, mountNode);
````
