---
order: 2
title: 前置/后置标签
---

用于配置一些固定组合。

````jsx
import { Input, Select } from 'antd';
const Option = Select.Option;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 80 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 70 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

ReactDOM.render(
  <div>
    <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    <div style={{ marginTop: 8 }}>
      <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    </div>
  </div>
, mountNode);
````
