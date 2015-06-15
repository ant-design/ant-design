# 进度条

- order: 0

标准的进度条。

---

````jsx
var Progress = antd.Progress.Line;

React.render(
  <div>
    <Progress percent="30" width="300" strokeWidth="3" />
    <Progress percent="70" width="300" strokeWidth="3" status="exception" />
    <Progress percent="100" width="300" strokeWidth="3" />
  </div>
  , document.getElementById('components-progress-demo-line'));
````
