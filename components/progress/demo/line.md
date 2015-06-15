# Line 用法

- order: 0

Progress Line用法

---

````jsx
var Line = antd.Progress.Line;

React.render(
  <div>
    <Line percent="30" />
    <Line percent="70" status="exception" />
    <Line percent="100" />
  </div>
  , document.getElementById('components-progress-demo-line'));
````
