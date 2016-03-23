# 分组

- order: 5

用 `OptionGroup` 进行选项分组。

---

````jsx
import { Select, Option, OptionGroup } from 'antd';

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select defaultValue="lucy"
    style={{ width: 200 }}
    showSearch={false}
    onChange={handleChange}>
    <OptionGroup label="Manager">
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
    </OptionGroup>
    <OptionGroup label="Engineer">
      <Option value="yiminghe">yiminghe</Option>
    </OptionGroup>
  </Select>
, mountNode);
````
