# 进度圈

- order: 1

圈形的进度。

---

````jsx
import { Progress, Icon } from 'antd';
const ProgressCircle = Progress.Circle;

ReactDOM.render(
  <div>
    <ProgressCircle percent={30} />
    <ProgressCircle percent={70} status="exception" format={<Icon type="exclamation" />} />
    <ProgressCircle percent={100} />
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
