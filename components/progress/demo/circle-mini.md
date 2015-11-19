# 小型进度圈

- order: 3

小一号的圈形进度。

---

````jsx
import { Progress, Icon } from 'antd';
const ProgressCircle = Progress.Circle;

ReactDOM.render(
  <div>
    <ProgressCircle percent={30} width={80} />
    <ProgressCircle percent={70} width={80} status="exception" format={<Icon type="exclamation" />} />
    <ProgressCircle percent={100} width={80} />
  </div>
  , document.getElementById('components-progress-demo-circle-mini'));
````
