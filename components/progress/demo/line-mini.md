# Line 用法

- order: 0

Progress Line用法

---

````jsx
var Line = antd.Progress.Line;

React.render(
  <div>
    <Line percent="30" width="170" strokeWidth="3" />
    <Line percent="70" width="170" strokeWidth="3" status="exception" />
    <Line percent="100" width="170" strokeWidth="3" />
  </div>
  , document.getElementById('components-progress-demo-line-mini'));
````
