# 不可用

- order: 1

checkbox 不可用

---

````jsx
var Checkbox = antd.Checkbox;
var container = document.getElementById('components-checkbox-demo-disable');

React.render(
<ul>
  <li>
    <Checkbox defaultChecked={false} disabled={true}/>
  </li>
  <li>
    <Checkbox defaultChecked={true} disabled={true}/>
  </li>
</ul>
, container);
````
