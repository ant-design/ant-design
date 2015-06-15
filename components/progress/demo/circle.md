# 进度圈

- order: 2

圈形的进度。

---

````jsx
var ProgressCircle = antd.Progress.Circle;

React.render(
  <div>
    <ProgressCircle percent="30" width="126" />
    <ProgressCircle percent="70" width="126" status="exception" />
    <ProgressCircle percent="100" width="126" />
  </div>
  , document.getElementById('components-progress-demo-circle'));
````

<style>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
