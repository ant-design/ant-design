# 基本用法

- order: 0

基本的时间轴。

---

````jsx
import { Timeline } from 'antd';

ReactDOM.render(
<Timeline>
  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
  <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
</Timeline>
, document.getElementById('components-timeline-demo-basic'));
````
