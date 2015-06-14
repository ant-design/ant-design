# 基本使用

- order: 0

基本使用

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select value="lucy" style={{width:250}} onChange={handleChange}>
    <Option value="jack">jack</Option>
    <Option value="lucy">lucy</Option>
    <Option value="disabled" disabled>disabled</Option>
    <Option value="yiminghe">yiminghe</Option>
  </Select>
, document.getElementById('components-select-demo-basic'));
````
