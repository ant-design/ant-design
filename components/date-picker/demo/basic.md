---
order: 0
title: 基本
---

最简单的用法。

````jsx
import { DatePicker } from 'antd';

function onChange(value, dateString) {
  console.log(value, dateString);
}

ReactDOM.render(<DatePicker onChange={onChange} />, mountNode);
````
