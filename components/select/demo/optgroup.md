---
order: 5
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
const Option = Select.Option;
const OptGroup = Select.OptGroup;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select defaultValue="lucy"
    style={{ width: 200 }}
    showSearch={false}
    onChange={handleChange}
  >
    <OptGroup label="Manager">
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="yiminghe">yiminghe</Option>
    </OptGroup>
  </Select>
, mountNode);
````
