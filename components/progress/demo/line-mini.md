# 小型进度条

- order: 2

适合放在较狭窄的区域内。

---

````jsx
var Progress = antd.Progress.Line;

React.render(
  <div>
    <Progress percent="30" width="170" strokeWidth="3" />
    <Progress percent="70" width="170" strokeWidth="3" status="exception" />
    <Progress percent="100" width="170" strokeWidth="3" />
  </div>
  , document.getElementById('components-progress-demo-line-mini'));
````
