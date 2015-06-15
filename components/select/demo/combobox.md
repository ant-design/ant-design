# combobox

- order: 1

功能基本与 suggest 类似。（Google的搜索提示）

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

React.render(
  <Select combobox>
    <Option value="jack">jack</Option>
    <Option value="lucy">lucy</Option>
    <Option value="disabled" disabled>disabled</Option>
    <Option value="yiminghe">yiminghe</Option>
  </Select>
, document.getElementById('components-select-demo-combobox'));
````
