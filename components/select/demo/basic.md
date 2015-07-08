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
  <Select value="lucy" style={{width:200}} onChange={handleChange}>
    <Option key="jack" value="jack">jack</Option>
    <Option key="lucy" value="lucy">lucy</Option>
    <Option key="disabled" value="disabled" disabled>disabled</Option>
    <Option key="yiminghe" value="yiminghe">yiminghe</Option>
  </Select>
, document.getElementById('components-select-demo-basic'));
````
