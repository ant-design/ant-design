---
order: 3
title: 标签
---

tags select，随意输入的内容（scroll the menu）

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
  <Select tags
    style={{ width: '100%' }}
    searchPlaceholder="标签模式"
    onChange={handleChange}
  >
    {children}
  </Select>
, mountNode);
````
