# 小型进度条

- order: 2

适合放在较狭窄的区域内。

---

````jsx
var Progress = antd.Progress.Line;

React.render(
  <div>
    <Progress percent="30" strokeWidth="5" />
    <Progress percent="70" strokeWidth="5" status="exception" />
    <Progress percent="100" strokeWidth="5" />
  </div>
  , document.getElementById('components-progress-demo-line-mini'));
````
