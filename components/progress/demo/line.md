# 进度条

- order: 0

标准的进度条。

---

````jsx
import { Progress, Icon } from 'antd';
const ProgressLine = Progress.Line;

ReactDOM.render(
  <div>
    <ProgressLine percent={30} />
    <ProgressLine percent={50} status="active" />
    <ProgressLine percent={70} status="exception" format={<Icon type="exclamation" />} />
    <ProgressLine percent={100} />
    <ProgressLine percent={50} showInfo={false} />
  </div>
, document.getElementById('components-progress-demo-line'));
````
