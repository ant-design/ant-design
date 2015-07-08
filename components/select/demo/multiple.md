# 多选

- order: 2

多选，从已有条目中选择（scroll the menu）

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

var children = [];
for (var i = 10; i < 36; i++) {
  children.push(<Option value={i.toString(36) + i} key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select multiple value={['a10', 'c12']} onChange={handleChange}>
    {children}
  </Select>
, document.getElementById('components-select-demo-multiple'));
````
