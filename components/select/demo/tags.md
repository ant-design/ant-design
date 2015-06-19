# 标签

- order: 3

tags select，随意输入的内容（scroll the menu）

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
  <Select tags value={['name2', 'name3']} onChange={handleChange}>
    {children}
  </Select>
, document.getElementById('components-select-demo-tags'));
````
