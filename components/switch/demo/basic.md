# 基本用法

- order: 0

简单的 switch。

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-basic');

function onChange(checked){
  console.log('switch to ' + checked);
}

React.render(<Switch defaultChecked={false} onChange={onChange}/>, container);
````
