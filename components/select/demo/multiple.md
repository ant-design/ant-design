---
order: 2
title: 多选
---

多选，从已有条目中选择（scroll the menu）

````jsx
import { Select } from 'antd';
const Option = Select.Option;

let children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    multiple
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={handleChange}
  >
    {children}
  </Select>
, mountNode);
````
