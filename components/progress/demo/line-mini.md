# 小型进度条

- order: 1

适合放在较狭窄的区域内。

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
