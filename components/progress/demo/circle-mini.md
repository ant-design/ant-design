# 小型进度圈

- order: 3

小一号的圈形进度。

---

````jsx
var ProgressCircle = antd.Progress.Circle;

React.render(
  <div>
    <ProgressCircle percent="30" width="80" />
    <ProgressCircle percent="70" width="80" status="exception" />
    <ProgressCircle percent="100" width="80" />
  </div>
  , document.getElementById('components-progress-demo-circle-mini'));
````

<style>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
