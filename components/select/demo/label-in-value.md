---
order: 10
title: 获取 label
---

使用 `labelInValue` 属性，Option 的每项 label 会被包装到 value 中传递给 onChange 等函数，此时 Select 的 value 是一个对象。

````jsx
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log(value);
}

ReactDOM.render(
  <div>
    <Select labelInValue defaultValue={{ key: 'lucy' }} style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>
, mountNode);
````
