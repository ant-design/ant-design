---
order: 6
title:
  zh-CN: 分组
  en-US: Option Group
---

## zh-CN

用 `OptGroup` 进行选项分组。

## en-US

Using `OptGroup` to group the options.

````jsx
import { Select } from 'antd';

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    defaultValue="lucy"
    style={{ width: 200 }}
    onChange={handleChange}
  >
    <OptGroup label="Manager">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup>
  </Select>,
  mountNode
);
````
