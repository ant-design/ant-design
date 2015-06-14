# 多选

- order: 1

多选（scroll the menu）

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

var children = [];
for (var i = 10; i < 36; i++) {
  children.push(<Option value={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log('selected ' + value);
}

React.render(
  <Select multiple value={['name2', 'name3']} onChange={handleChange}>
    {children}
  </Select>
, document.getElementById('components-select-demo-multiple'));
````
