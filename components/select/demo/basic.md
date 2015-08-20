# 基本使用

- order: 0

基本使用。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select defaultValue="lucy" style={{width:200}} onChange={handleChange}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
    <Option value="yiminghe">yiminghe</Option>
  </Select>
, document.getElementById('components-select-demo-basic'));
````
