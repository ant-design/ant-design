---
order: 1
title: 
  zh-CN: 带搜索框
  en-US: Select with search field
---

## zh-CN
展开后可对选项进行搜索。

## en-US
Search the options while expanded.

````jsx
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select showSearch
    style={{ width: 200 }}
    placeholder="请选择人员"
    optionFilterProp="children"
    notFoundContent="无法找到"
    onChange={handleChange}
  >
    <Option value="jack">杰克</Option>
    <Option value="lucy">露西</Option>
    <Option value="tom">汤姆</Option>
  </Select>
, mountNode);
````
