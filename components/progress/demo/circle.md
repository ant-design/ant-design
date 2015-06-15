# 进度圈

- order: 2

圈形的进度。

---

````jsx
var Circle = antd.Progress.Circle;

React.render(
  <div>
    <Circle percent="30" width="126" />
    <Circle percent="70" width="126" status="exception" />
    <Circle percent="100" width="126" />
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
