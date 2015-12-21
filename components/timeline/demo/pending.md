# 最后一个

- order: 2

在最后位置添加一个幽灵节点，表示时间轴未完成，还在记录过程中。

---

````jsx
import { Timeline } from 'antd';

ReactDOM.render(
<Timeline pending>
  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
</Timeline>
, document.getElementById('components-timeline-demo-pending'));
````
