---
order: 1
title: 带搜索框
---

在浮层内顶部有搜索框的单项选择器。

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
    searchPlaceholder="输入关键词"
    onChange={handleChange}>
    <Option value="jack">杰克</Option>
    <Option value="lucy">露西</Option>
    <Option value="tom">汤姆</Option>
  </Select>
, mountNode);
````
