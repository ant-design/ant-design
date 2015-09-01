# 最后一个

- order: 2

在最后位置添加一个幽灵节点。

---

````jsx
var Timeline = antd.Timeline;
var Item = Timeline.Item;
var container = document.getElementById('components-timeline-demo-end');

React.render(<Timeline>
               <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
               <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
               <Timeline.Item end={true}>技术测试异常 2015-09-01</Timeline.Item>
             </Timeline>
, container);
````
