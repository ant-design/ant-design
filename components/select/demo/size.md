# 三种大小

- order: 0

三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `32px` 和 `22px` ，默认高度为 `28px`

---

````jsx
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <div>
  <Select size="large" value="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
    <Select value="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
    <Select size="small" value="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </div>
, document.getElementById('components-select-demo-size'));
````

````css
.ant-select{
  margin: 0 10px 10px 0;
}
````