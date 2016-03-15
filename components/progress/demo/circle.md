# 进度圈

- order: 1

圈形的进度。

---

````jsx
import { Progress } from 'antd';
const ProgressCircle = Progress.Circle;

ReactDOM.render(
  <div>
    <ProgressCircle percent={75} />
    <ProgressCircle percent={70} status="exception" />
    <ProgressCircle percent={100} />
  </div>
  , mountNode);
````

<style>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
