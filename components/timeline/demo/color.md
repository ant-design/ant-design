# 圆圈颜色

- order: 1

圆圈颜色。

---

````jsx
let Timeline = antd.Timeline;
let container = document.getElementById('components-timeline-demo-color');

React.render(
<Timeline>
  <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item color="red">初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
</Timeline>
, container);
````
