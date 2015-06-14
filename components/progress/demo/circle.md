# Circle 用法

- order: 0

Progress Circle用法

---

````jsx
var Circle = antd.Progress.Circle;

React.render(
  <div>
    <Circle percent="30" width="200" strokeWidth="4" />
    <Circle percent="70" width="200" strokeWidth="4" status="exception" />
    <Circle percent="100" width="200" strokeWidth="4" />
  </div>
  , document.getElementById('components-progress-demo-circle'));
````
