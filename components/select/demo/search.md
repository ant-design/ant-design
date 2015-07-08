# 带搜索框

- order: 1

在浮层内顶部有搜索框的单项选择器。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select value="lucy" showSearch={true} style={{width:200}} onChange={handleChange}>
    <Option key="jack" value="jack">jack</Option>
    <Option key="lucy" value="lucy">lucy</Option>
    <Option key="disabled" value="disabled" disabled>disabled</Option>
    <Option key="yiminghe" value="yiminghe">yiminghe</Option>
  </Select>
, document.getElementById('components-select-demo-search'));
````
