# 分组

- order: 5

option分组

---

````jsx
var Select = antd.Select;
var Option = Select.Option;
var OptGroup = Select.OptGroup;

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select value="lucy"
    style={{width:200}}
    showSearch={false}
    onChange={handleChange}>
    <OptGroup label="manager">
      <Option value="jack">
        <b style={{
          color: 'red'
        }}>jack</b>
      </Option>
      <Option value="lucy">lucy</Option>
    </OptGroup>
    <OptGroup label="engineer">
      <Option value="yiminghe">yiminghe</Option>
    </OptGroup>
  </Select>
, document.getElementById('components-select-demo-optgroup'));
````
