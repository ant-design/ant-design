# 多选

- order: 1

多选

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

var style = '.rc-select-menu {max-height:200px;overflow:auto;}';

var c2 = (
  <div>
    <h1>multiple select（scroll the menu）</h1>
    <div style={{width: 300}}>
      <style>
      {style}
      </style>
      <Select multiple value={['name2', 'name3']} onChange={handleChange}>
    {children}
      </Select>
    </div>
  </div>
);

React.render(
  c2
, document.getElementById('components-select-demo-multiple'));
````
