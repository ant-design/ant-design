# 简单

- order: 0

最简单的用法。

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-basic');

function onChange(checked){
  console.log('switch to ' + checked);
}

React.render(<Switch defaultChecked={false} onChange={onChange} />, container);
````
