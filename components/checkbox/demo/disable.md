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
    <Checkbox defaultChecked={false} disabled={true} label="不可用"/>
  </li>
  <li>
    <Checkbox defaultChecked={true} disabled={true} label="不可用"/>
  </li>
</ul>
, container);
````
